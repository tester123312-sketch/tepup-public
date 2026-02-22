/**
 * Script để tạo khóa học "Thuế & Quyền Công Dân" phiên bản nâng cao
 * Tận dụng tối đa các block components: TextBlock, CalloutBlock, QuestionBlock
 * Mỗi lesson kết thúc bằng Tổng kết bài học
 *
 * Chạy: npx tsx scripts/seed-taxation-course-v2.ts
 */

import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

// Create Prisma client with adapter (required for Prisma 7)
const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// ===== TYPES =====
interface TextBlock {
  type: 'text';
  title?: string;
  paragraphs: string[];
}

interface CalloutBlock {
  type: 'callout';
  icon?: string;
  title?: string;
  text: string;
  variant?: 'info' | 'warning' | 'success';
}

interface QuestionBlock {
  type: 'question';
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation?: string;
}

type ContentBlock = TextBlock | CalloutBlock | QuestionBlock;

// ===== COURSE DATA =====

const CATEGORY_DATA = {
  name: 'Kinh tế & Xã hội',
  slug: 'kinh-te-xa-hoi',
  description: 'Các khóa học về kinh tế, thuế, và quyền công dân',
  icon: 'building-library',
};

const COURSE_DATA = {
  name: 'Thuế & Quyền Công Dân',
  slug: 'thue-va-quyen-cong-dan-v2',
  description:
    'Khóa học giúp người học nhận ra mình là người nộp thuế, hiểu tiền thuế đi đâu, và bắt đầu đòi hỏi minh bạch & trách nhiệm giải trình từ nhà nước. Phiên bản nâng cao với câu hỏi trắc nghiệm.',
  icon: 'banknotes',
  isNew: true,
};

const LEVELS_DATA = [
  { name: 'Thuế ơi thuế à (WHAT)', sortOrder: 1 },
  { name: 'Tại sao đóng thuế? (WHY)', sortOrder: 2 },
  { name: 'Thuế và Trách nhiệm', sortOrder: 3 },
];

// ===== LESSONS DATA =====

const LESSONS_DATA = {
  // Level 1: Thuế ơi thuế à
  level1: [
    {
      name: 'Bạn đang đóng thuế gì?',
      slug: 'ban-dang-dong-thue-gi-v2',
      sortOrder: 1,
      content: {
        title: 'Bạn đang đóng thuế gì?',
        blocks: [
          {
            type: 'callout',
            variant: 'info',
            text: 'Mua 1kg thịt giá 250.000đ → Bạn đóng 25.000đ thuế VAT (10%). Lương 13 triệu → Thực nhận khoảng 10.5 triệu sau thuế và bảo hiểm.',
          },
          {
            type: 'text',
            paragraphs: [
              'Hãy tưởng tượng bạn đang mua 1kg thịt lợn tại chợ hoặc siêu thị với giá 250.000 đồng. Trong số tiền đó, có 25.000 đồng—tương đương 10%—là thuế giá trị gia tăng (VAT) mà bạn đã trả cho Nhà nước.',
              'Hoặc hãy nhìn vào bảng lương của bạn: Lương gross 13 triệu, sau khi trừ thuế thu nhập cá nhân và các khoản bảo hiểm, bạn thực nhận chỉ còn khoảng 10.5 triệu.',
              'Thuế hiện diện trong cuộc sống hàng ngày của bạn - từ việc mua hàng, nhận lương, cho đến sử dụng các dịch vụ.',
            ],
          },
          {
            type: 'text',
            title: 'Lược sử của thuế',
            paragraphs: [
              'Bạn không phải là người duy nhất phàn nàn về thuế. Con người đã phải đối mặt với thuế từ rất lâu rồi.',
              'Từ nền văn minh Lưỡng Hà cổ đại (khoảng 3000 TCN), nơi người dân phải nộp một phần sản phẩm nông nghiệp cho các tư tế và quan lại, đến Ai Cập cổ đại, nơi thuế được sử dụng để xây dựng kim tự tháp và duy trì quân đội.',
              'Trong Kinh Thánh, khái niệm "thuế thập phân" (một phần mười) được đề cập như một nghĩa vụ tôn giáo và xã hội. Người dân phải nộp một phần mười thu nhập hoặc sản phẩm của mình cho đền thờ hoặc nhà nước.',
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'Oliver Wendell Holmes Jr., Thẩm phán Tối cao tòa án Hoa Kỳ (1927)',
            text: '"Thuế là thứ chúng ta phải trả cho một xã hội văn minh."',
          },
          {
            type: 'text',
            paragraphs: [
              'Khi bạn trả thuế, bạn đang đóng góp vào việc xây dựng trường học, bệnh viện, đường xá, hệ thống pháp luật, và an ninh quốc gia.',
              'Thuế là giá của một xã hội văn minh, nơi mọi người cùng chia sẻ gánh nặng để tạo dựng cuộc sống tốt đẹp hơn.',
            ],
          },
          {
            type: 'question',
            question: 'Khi bạn mua một ly cà phê 50.000đ, bạn đang đóng loại thuế gì?',
            options: [
              { id: '1', text: 'Thuế thu nhập cá nhân (TNCN)', isCorrect: false },
              { id: '2', text: 'Thuế giá trị gia tăng (VAT)', isCorrect: true },
              { id: '3', text: 'Thuế thu nhập doanh nghiệp', isCorrect: false },
              { id: '4', text: 'Thuế tài sản', isCorrect: false },
            ],
            explanation: 'Thuế VAT (giá trị gia tăng) được tính vào giá sản phẩm/dịch vụ bạn mua. Khi bạn mua ly cà phê 50.000đ, trong đó có khoảng 5.000đ (10%) là thuế VAT.',
          },
          {
            type: 'question',
            question: 'Thuế thập phân trong lịch sử có nghĩa là gì?',
            options: [
              { id: '1', text: 'Thuế đánh trên 10 loại hàng hóa', isCorrect: false },
              { id: '2', text: 'Nộp một phần mười thu nhập hoặc sản phẩm', isCorrect: true },
              { id: '3', text: 'Thuế được thu 10 lần trong năm', isCorrect: false },
              { id: '4', text: 'Thuế dành cho 10% người giàu nhất', isCorrect: false },
            ],
            explanation: 'Thuế thập phân (tithe) là nghĩa vụ nộp một phần mười (10%) thu nhập hoặc sản phẩm, xuất hiện trong nhiều nền văn minh và tôn giáo cổ đại.',
          },
          {
            type: 'callout',
            variant: 'success',
            title: '📝 Tổng kết bài học',
            text: '• Bạn đóng thuế mỗi ngày qua việc mua hàng (VAT) và nhận lương (TNCN)\n• Thuế đã tồn tại từ thời cổ đại như một phần của xã hội có tổ chức\n• Thuế là giá của một xã hội văn minh - đóng góp cho trường học, bệnh viện, đường xá',
          },
        ] as ContentBlock[],
      },
    },
    {
      name: 'Ai đang đóng thuế?',
      slug: 'ai-dang-dong-thue-v2',
      sortOrder: 2,
      content: {
        title: 'Ai đang đóng thuế?',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Khi nói về thuế, chúng ta cần phân biệt hai khái niệm quan trọng: người nộp thuế trên giấy tờ và người thực sự chịu gánh nặng thuế.',
              'Đây là sự khác biệt mà nhiều người thường bỏ qua, nhưng lại rất quan trọng để hiểu cách thuế thực sự ảnh hưởng đến bạn.',
            ],
          },
          {
            type: 'text',
            title: 'Trên giấy tờ - Người nộp thuế theo pháp luật',
            paragraphs: [
              'Theo quy định của pháp luật, người nộp thuế là các cá nhân và tổ chức có nghĩa vụ kê khai và chuyển tiền thuế cho Nhà nước. Điều này bao gồm:',
              '• Người lao động: Thuế thu nhập cá nhân được khấu trừ trực tiếp từ lương hàng tháng.',
              '• Người tiêu dùng: Khi bạn mua hàng hóa hoặc dịch vụ, bạn trả thuế giá trị gia tăng (VAT).',
              '• Doanh nghiệp: Các công ty phải nộp thuế thu nhập doanh nghiệp, thuế xuất nhập khẩu, thuế tài nguyên...',
            ],
          },
          {
            type: 'text',
            title: 'Trên thực tế - Gánh nặng thuế (Tax Incidence)',
            paragraphs: [
              'Trong kinh tế học, khái niệm "gánh nặng thuế" (tax incidence) mô tả việc ai là người cuối cùng phải chịu khoản thuế đó.',
              'Gánh nặng thuế không phụ thuộc vào ai là người nộp thuế trên giấy tờ, mà phụ thuộc vào ai là người thực sự mất tiền và không thể đẩy chi phí đó cho người khác.',
              'Điều này giải thích tại sao dù doanh nghiệp là người nộp VAT cho nhà nước, nhưng người tiêu dùng mới là người thực sự chi trả.',
            ],
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Nguyên tắc quan trọng',
            text: 'Bên nào ít linh hoạt hơn, có ít lựa chọn thay thế hơn, thì bên đó sẽ phải gánh chịu thuế. Đây là quy tắc vàng trong kinh tế học thuế.',
          },
          {
            type: 'question',
            question: 'Theo quy định pháp luật, ai là người nộp thuế VAT cho nhà nước?',
            options: [
              { id: '1', text: 'Người tiêu dùng cuối cùng', isCorrect: false },
              { id: '2', text: 'Doanh nghiệp bán hàng', isCorrect: true },
              { id: '3', text: 'Nhà sản xuất', isCorrect: false },
              { id: '4', text: 'Ngân hàng', isCorrect: false },
            ],
            explanation: 'Theo pháp luật, doanh nghiệp bán hàng là người có trách nhiệm kê khai và nộp VAT cho nhà nước. Tuy nhiên, chi phí này được tính vào giá bán, nên người tiêu dùng là người thực sự chi trả.',
          },
          {
            type: 'question',
            question: 'Khái niệm "gánh nặng thuế" trong kinh tế học mô tả điều gì?',
            options: [
              { id: '1', text: 'Số tiền thuế phải nộp theo pháp luật', isCorrect: false },
              { id: '2', text: 'Ai là người cuối cùng thực sự mất tiền vì thuế', isCorrect: true },
              { id: '3', text: 'Tổng số thuế thu được trong một năm', isCorrect: false },
              { id: '4', text: 'Số lượng loại thuế phải đóng', isCorrect: false },
            ],
            explanation: 'Gánh nặng thuế (tax incidence) mô tả ai là người cuối cùng thực sự mất tiền vì thuế - không phải ai nộp trên giấy tờ, mà là ai không thể đẩy chi phí đó cho người khác.',
          },
          {
            type: 'callout',
            variant: 'success',
            title: '📝 Tổng kết bài học',
            text: '• Người nộp thuế trên giấy tờ gồm: người lao động, người tiêu dùng, doanh nghiệp\n• Gánh nặng thuế thực tế không phụ thuộc vào ai nộp mà phụ thuộc vào ai mất tiền\n• Bên ít linh hoạt hơn, có ít lựa chọn thay thế hơn sẽ phải chịu thuế',
          },
        ] as ContentBlock[],
      },
    },
    {
      name: 'Ai thực sự gánh chịu thuế?',
      slug: 'ai-thuc-su-ganh-chiu-thue-v2',
      sortOrder: 3,
      content: {
        title: 'Ai thực sự gánh chịu thuế?',
        blocks: [
          {
            type: 'text',
            title: 'Hàng hóa thiết yếu: Người tiêu dùng chịu thuế',
            paragraphs: [
              'Hãy tưởng tượng Chính phủ quyết định áp thuế môi trường lên xăng dầu, với mức thuế thêm 1.000 đồng cho mỗi lít xăng.',
              'Ngay lập tức, các trạm xăng sẽ tăng giá bán lên 1.000 đồng/lít. Người tiêu dùng, dù có phàn nàn đến đâu, vẫn phải đổ xăng để đi làm, đi học.',
              'Trong trường hợp này, người tiêu dùng là người cuối cùng phải gánh chịu toàn bộ khoản thuế. Họ không thể "né" thuế vì không có phương án thay thế.',
            ],
          },
          {
            type: 'text',
            title: 'Hàng hóa xa xỉ: Nhà sản xuất và người lao động chịu thuế',
            paragraphs: [
              'Giả sử Chính phủ đánh thuế mới 10% lên túi xách hàng hiệu. Một thương hiệu quyết định tăng giá chiếc túi từ 100 triệu đồng lên 110 triệu đồng.',
              'Tuy nhiên, khách hàng của mặt hàng xa xỉ thường có nhiều lựa chọn hơn: họ có thể quyết định không mua túi xách đó, mà dùng số tiền cho một chuyến du lịch sang trọng.',
              'Để bán được hàng, thương hiệu buộc phải chấp nhận giảm lợi nhuận (chủ sở hữu chịu thiệt) hoặc cắt giảm chi phí như giảm tiền thưởng, sa thải nhân viên (người lao động chịu thiệt).',
            ],
          },
          {
            type: 'text',
            title: 'Thuế doanh nghiệp: Gánh nặng lan tỏa',
            paragraphs: [
              'Thuế doanh nghiệp là một trong những loại thuế phức tạp nhất. Khi công ty phải đối mặt với mức thuế suất cao hơn, họ sẽ tìm mọi cách để chuyển gánh nặng này:',
              '• Cách 1: Tăng giá bán - Đẩy chi phí thuế sang người tiêu dùng',
              '• Cách 2: Cắt giảm chi phí - Đóng băng lương, sa thải nhân viên - người lao động gánh chịu',
              '• Cách 3: Giảm lợi nhuận - Cổ đông và chủ sở hữu nhận ít cổ tức hơn',
              'Thuế doanh nghiệp giống như một hòn đá ném xuống mặt hồ: tạo ra những con sóng lan tỏa, ảnh hưởng đến tất cả mọi người.',
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'Quy tắc vàng của gánh nặng thuế',
            text: '• Bên nào linh hoạt hơn, có nhiều lựa chọn thay thế hơn → Bên đó sẽ né được thuế\n• Bên nào bị phụ thuộc hơn, có ít lựa chọn thay thế hơn → Bên đó sẽ phải chịu thuế',
          },
          {
            type: 'question',
            question: 'Khi chính phủ tăng thuế xăng, ai thường phải gánh chịu phần lớn?',
            options: [
              { id: '1', text: 'Công ty xăng dầu', isCorrect: false },
              { id: '2', text: 'Chính phủ', isCorrect: false },
              { id: '3', text: 'Người tiêu dùng', isCorrect: true },
              { id: '4', text: 'Ngân hàng', isCorrect: false },
            ],
            explanation: 'Xăng là hàng hóa thiết yếu, người tiêu dùng không có lựa chọn thay thế (vẫn phải đổ xăng để đi làm), nên họ là người phải gánh chịu phần lớn khoản thuế tăng thêm.',
          },
          {
            type: 'question',
            question: 'Thuế doanh nghiệp ảnh hưởng đến những nhóm nào?',
            options: [
              { id: '1', text: 'Chỉ ảnh hưởng đến chủ doanh nghiệp', isCorrect: false },
              { id: '2', text: 'Chỉ ảnh hưởng đến người tiêu dùng', isCorrect: false },
              { id: '3', text: 'Chỉ ảnh hưởng đến người lao động', isCorrect: false },
              { id: '4', text: 'Ảnh hưởng đến cả người tiêu dùng, người lao động và chủ sở hữu', isCorrect: true },
            ],
            explanation: 'Thuế doanh nghiệp có thể được chuyển sang người tiêu dùng (qua tăng giá), người lao động (qua cắt giảm lương/nhân sự), hoặc chủ sở hữu (qua giảm lợi nhuận). Gánh nặng lan tỏa đến tất cả các bên.',
          },
          {
            type: 'callout',
            variant: 'success',
            title: '📝 Tổng kết bài học',
            text: '• Hàng hóa thiết yếu: Người tiêu dùng chịu thuế vì không có lựa chọn thay thế\n• Hàng hóa xa xỉ: Nhà sản xuất và người lao động chịu thuế\n• Thuế doanh nghiệp: Gánh nặng lan tỏa đến khách hàng, nhân viên, nhà đầu tư',
          },
        ] as ContentBlock[],
      },
    },
    {
      name: 'Thuế là gì?',
      slug: 'thue-la-gi-v2',
      sortOrder: 4,
      content: {
        title: 'Thuế là gì?',
        blocks: [
          {
            type: 'callout',
            variant: 'info',
            text: 'Thuế là khoản tiền bắt buộc mà Nhà nước thu từ cá nhân và tổ chức. Khác với việc bạn tự nguyện chi tiêu cho hàng hóa hay dịch vụ, thuế không đi kèm quyền nhận trực tiếp một dịch vụ hay hàng hóa cụ thể từ Nhà nước.',
          },
          {
            type: 'text',
            paragraphs: [
              'Khi bạn mua một ly cà phê, bạn trả tiền và nhận được ly cà phê. Đây là giao dịch tự nguyện.',
              'Nhưng khi bạn đóng thuế, bạn không "mua" một dịch vụ cụ thể nào. Tiền thuế của bạn được gộp chung với thuế của mọi người khác để chi trả cho các dịch vụ công mà tất cả mọi người đều được hưởng.',
            ],
          },
          {
            type: 'text',
            title: 'Đặc điểm 1: Tính bắt buộc',
            paragraphs: [
              'Nhà nước có quyền lực pháp lý buộc cá nhân, doanh nghiệp phải nộp thuế theo luật.',
              'Điều này có nghĩa là bạn không thể từ chối nộp thuế như cách bạn có thể quyết định không mua một sản phẩm nào đó. Thuế là nghĩa vụ bắt buộc, được quy định bởi pháp luật và được thực thi bởi cơ quan nhà nước.',
              'Nếu bạn không nộp thuế, bạn có thể bị phạt tiền, thậm chí bị truy tố hình sự.',
            ],
          },
          {
            type: 'text',
            title: 'Đặc điểm 2: Không gắn với quyền lợi trực tiếp',
            paragraphs: [
              'Khi đóng thuế, bạn không được "mua" một dịch vụ cụ thể; thay vào đó, Nhà nước dùng ngân sách để cung cấp dịch vụ công, phúc lợi, an ninh, hạ tầng… cho cộng đồng.',
              'Ví dụ, khi bạn trả thuế thu nhập cá nhân, bạn không nhận được một dịch vụ cụ thể tương ứng với số tiền thuế đó. Tiền thuế của bạn góp phần xây dựng trường học, bệnh viện, đường xá mà tất cả mọi người đều được hưởng lợi.',
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'Thuế trong hệ thống hiện đại',
            text: 'Trong hệ thống thuế hiện đại, thuế được xác định theo các tham số rõ ràng: mức thuế suất, mức thu nhập chịu thuế, loại hàng hóa chịu thuế. Điều này giúp thuế trở thành một cơ chế ổn định, minh bạch và dự đoán được.',
          },
          {
            type: 'question',
            question: 'Đặc điểm nào KHÔNG phải là đặc điểm của thuế?',
            options: [
              { id: '1', text: 'Tính bắt buộc', isCorrect: false },
              { id: '2', text: 'Không gắn với quyền lợi trực tiếp', isCorrect: false },
              { id: '3', text: 'Được quy định bởi pháp luật', isCorrect: false },
              { id: '4', text: 'Có thể từ chối nếu không đồng ý', isCorrect: true },
            ],
            explanation: 'Thuế có tính bắt buộc - bạn không thể từ chối nộp thuế. Nếu không nộp, bạn sẽ bị xử phạt theo pháp luật.',
          },
          {
            type: 'question',
            question: 'Tại sao thuế không giống như việc mua hàng hóa thông thường?',
            options: [
              { id: '1', text: 'Vì thuế rẻ hơn', isCorrect: false },
              { id: '2', text: 'Vì thuế không nhận được dịch vụ cụ thể tương ứng', isCorrect: true },
              { id: '3', text: 'Vì thuế được trả bằng tiền mặt', isCorrect: false },
              { id: '4', text: 'Vì thuế chỉ dành cho người giàu', isCorrect: false },
            ],
            explanation: 'Khi bạn mua hàng, bạn nhận được sản phẩm/dịch vụ cụ thể. Nhưng khi đóng thuế, tiền của bạn được gộp chung để chi cho dịch vụ công mà mọi người cùng hưởng, không phải riêng bạn.',
          },
          {
            type: 'callout',
            variant: 'success',
            title: '📝 Tổng kết bài học',
            text: '• Thuế là khoản tiền bắt buộc mà Nhà nước thu từ cá nhân và tổ chức\n• Hai đặc điểm chính: Tính bắt buộc và Không gắn với quyền lợi trực tiếp\n• Thuế hiện đại được xác định theo các tham số rõ ràng như thuế suất, mức thu nhập chịu thuế',
          },
        ] as ContentBlock[],
      },
    },
    {
      name: 'Phân loại thuế',
      slug: 'phan-loai-thue-v2',
      sortOrder: 5,
      content: {
        title: 'Phân loại thuế',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Có thể có nhiều loại thuế với nhiều tên khác nhau. Nhưng nếu phân loại một cách đơn giản theo các nhà kinh tế học thì có 2 loại chính là thuế thu trực tiếp và thuế thu gián tiếp.',
            ],
          },
          {
            type: 'text',
            title: 'Thuế trực tiếp (Direct taxes)',
            paragraphs: [
              'Đánh trực tiếp lên thu nhập, lợi nhuận, tài sản và được trả trực tiếp bởi cá nhân hoặc tổ chức.',
              '• Thuế thu nhập cá nhân (TNCN): Thuế đánh vào thu nhập từ lương, thưởng, và các nguồn thu nhập khác.',
              '• Thuế thu nhập doanh nghiệp (CIT): Thuế đánh vào lợi nhuận của các doanh nghiệp.',
              '• Thuế tài sản, đất đai: Thuế sử dụng đất phi nông nghiệp và các loại thuế liên quan đến tài sản.',
              '• Thuế thừa kế, quà tặng: Hiện chưa áp dụng rộng nhưng có trong luật.',
            ],
          },
          {
            type: 'text',
            title: 'Thuế gián thu (Indirect taxes)',
            paragraphs: [
              'Đánh vào giá trị hàng hóa, dịch vụ, tiêu dùng và được thu bởi người bán hàng hoặc nhà sản xuất nhưng thực sự do người tiêu dùng chi trả.',
              '• Thuế giá trị gia tăng (VAT): Thuế đánh vào giá trị gia tăng của hàng hóa và dịch vụ, thường là 10% ở Việt Nam.',
              '• Thuế tiêu thụ đặc biệt: Thuế đánh vào sản phẩm xa xỉ, có hại cho sức khỏe (rượu, bia, thuốc lá, ô tô...).',
              '• Thuế xuất nhập khẩu: Thuế đánh vào hàng hóa được nhập khẩu hoặc xuất khẩu.',
              '• Thuế môi trường: Thuế carbon, xăng dầu, nước thải… nhằm bảo vệ môi trường.',
            ],
          },
          {
            type: 'text',
            title: 'Thuế thoái lui (Regressive tax)',
            paragraphs: [
              'Đánh cùng một mức cho tất cả mọi người nhưng ảnh hưởng nặng nề hơn đến người có thu nhập thấp.',
              'Ví dụ: Phí giấy phép lái xe 500.000đ - khoản tiền này chiếm tỷ lệ lớn hơn nhiều trong thu nhập của người nghèo so với người giàu.',
            ],
          },
          {
            type: 'text',
            title: 'Thuế lũy tiến (Progressive tax)',
            paragraphs: [
              'Đánh thuế người có thu nhập cao hơn ở mức cao hơn. Các khoản thu nhập được chia thành các bậc thuế khác nhau.',
              'Ví dụ: Thuế thu nhập cá nhân ở Việt Nam có các bậc từ 5% đến 35%. Nếu bạn kiếm 100 triệu/năm, chỉ phần vượt ngưỡng mới chịu thuế suất cao hơn.',
            ],
          },
          {
            type: 'text',
            title: 'Thuế tỷ lệ (Flat tax)',
            paragraphs: [
              'Yêu cầu cùng một tỷ lệ phần trăm thu nhập cho tất cả người nộp thuế, bất kể họ kiếm được bao nhiêu.',
              'Ví dụ: Một số quốc gia áp dụng thuế thu nhập cá nhân cố định 15% cho tất cả mọi người.',
            ],
          },
          {
            type: 'question',
            question: 'Thuế thu nhập cá nhân ở Việt Nam thuộc loại nào?',
            options: [
              { id: '1', text: 'Thuế gián thu và thuế thoái lui', isCorrect: false },
              { id: '2', text: 'Thuế trực tiếp và thuế lũy tiến', isCorrect: true },
              { id: '3', text: 'Thuế gián thu và thuế lũy tiến', isCorrect: false },
              { id: '4', text: 'Thuế trực tiếp và thuế tỷ lệ', isCorrect: false },
            ],
            explanation: 'Thuế TNCN ở Việt Nam là thuế trực tiếp (đánh trực tiếp vào thu nhập) và thuế lũy tiến (có các bậc thuế từ 5% đến 35%, thu nhập cao hơn đóng tỷ lệ cao hơn).',
          },
          {
            type: 'question',
            question: 'Loại thuế nào ảnh hưởng nặng nề hơn đến người nghèo?',
            options: [
              { id: '1', text: 'Thuế lũy tiến', isCorrect: false },
              { id: '2', text: 'Thuế thoái lui', isCorrect: true },
              { id: '3', text: 'Thuế trực tiếp', isCorrect: false },
              { id: '4', text: 'Thuế thu nhập doanh nghiệp', isCorrect: false },
            ],
            explanation: 'Thuế thoái lui đánh cùng một mức cho tất cả mọi người, nhưng chiếm tỷ lệ lớn hơn trong thu nhập của người nghèo. Ví dụ: phí 500.000đ chiếm 10% thu nhập người có lương 5 triệu, nhưng chỉ 1% với người có lương 50 triệu.',
          },
          {
            type: 'callout',
            variant: 'success',
            title: '📝 Tổng kết bài học',
            text: '• Thuế trực tiếp: Đánh trực tiếp lên thu nhập, lợi nhuận (TNCN, CIT, thuế tài sản)\n• Thuế gián thu: Đánh vào hàng hóa, dịch vụ (VAT, thuế tiêu thụ đặc biệt)\n• Thuế thoái lui ảnh hưởng người nghèo nhiều hơn, thuế lũy tiến công bằng hơn',
          },
        ] as ContentBlock[],
      },
    },
    {
      name: 'Suy ngẫm về thuế',
      slug: 'suy-ngam-ve-thue-v2',
      sortOrder: 6,
      content: {
        title: 'Suy ngẫm về thuế',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Thuế không chỉ là con số trên giấy tờ hay khoản tiền bị trừ đi từ lương của bạn. Nó là một cơ chế phức tạp ảnh hưởng đến mọi mặt của cuộc sống, từ giá cả hàng hóa, mức lương, đến quyết định kinh doanh của các doanh nghiệp.',
              'Thuế cũng là công cụ để Nhà nước điều tiết kinh tế, bảo vệ môi trường, và thực hiện các chính sách xã hội.',
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: '4 câu hỏi khi nghe về chính sách thuế mới',
            text: 'Lần tới khi bạn nghe về một chính sách thuế mới, hãy tự đặt ra những câu hỏi sau để hiểu rõ hơn về tác động của nó.',
          },
          {
            type: 'text',
            paragraphs: [
              '1. Ai sẽ thực sự gánh chịu khoản thuế này? Là người tiêu dùng, người lao động, hay chủ doanh nghiệp? Tại sao?',
              '2. Tôi có phải là người ít lựa chọn nhất? Nếu thuế tăng, tôi có thể chuyển sang lựa chọn khác không? Hay tôi buộc phải chấp nhận?',
              '3. Thuế này sẽ được sử dụng như thế nào? Nó sẽ đầu tư vào cơ sở hạ tầng, giáo dục, y tế, hay các dự án khác? Làm sao để tôi biết tiền thuế được sử dụng hiệu quả?',
              '4. Làm sao để tôi hiểu rõ hơn về thuế? Tôi có thể tìm hiểu ở đâu? Làm thế nào để tham gia vào quá trình giám sát chính sách thuế?',
            ],
          },
          {
            type: 'question',
            question: 'Khi nghe về một loại thuế mới, câu hỏi đầu tiên bạn nên đặt ra là gì?',
            options: [
              { id: '1', text: 'Thuế này sẽ được dùng để làm gì?', isCorrect: false },
              { id: '2', text: 'Ai sẽ thực sự gánh chịu khoản thuế này?', isCorrect: true },
              { id: '3', text: 'Thuế này có cao không?', isCorrect: false },
              { id: '4', text: 'Khi nào thuế này sẽ được áp dụng?', isCorrect: false },
            ],
            explanation: 'Câu hỏi quan trọng nhất là "Ai thực sự gánh chịu?" - vì người nộp thuế trên giấy tờ có thể khác với người thực sự mất tiền. Hiểu điều này giúp bạn đánh giá chính xác tác động của thuế.',
          },
          {
            type: 'question',
            question: 'Tại sao việc hiểu về thuế quan trọng đối với công dân?',
            options: [
              { id: '1', text: 'Để trốn thuế hiệu quả hơn', isCorrect: false },
              { id: '2', text: 'Để bảo vệ quyền lợi và giám sát chính phủ', isCorrect: true },
              { id: '3', text: 'Để kiếm được nhiều tiền hơn', isCorrect: false },
              { id: '4', text: 'Để được miễn thuế', isCorrect: false },
            ],
            explanation: 'Hiểu về thuế giúp bạn bảo vệ quyền lợi của mình, biết được tiền của bạn đi đâu, và có thể tham gia giám sát việc sử dụng ngân sách công một cách có trách nhiệm.',
          },
          {
            type: 'question',
            question: 'Thuế là công cụ để nhà nước làm gì?',
            options: [
              { id: '1', text: 'Chỉ để thu tiền từ người dân', isCorrect: false },
              { id: '2', text: 'Điều tiết kinh tế, bảo vệ môi trường, thực hiện chính sách xã hội', isCorrect: true },
              { id: '3', text: 'Chỉ để xây dựng cơ sở hạ tầng', isCorrect: false },
              { id: '4', text: 'Chỉ để trả lương cho công chức', isCorrect: false },
            ],
            explanation: 'Thuế là công cụ đa năng: không chỉ tạo nguồn thu mà còn điều tiết kinh tế (thuế tiêu thụ đặc biệt), bảo vệ môi trường (thuế carbon), phân phối lại thu nhập (thuế lũy tiến).',
          },
          {
            type: 'callout',
            variant: 'success',
            title: '📝 Tổng kết bài học',
            text: '• Luôn hỏi: Ai thực sự gánh chịu thuế này?\n• Luôn hỏi: Tôi có phải là người ít lựa chọn nhất?\n• Luôn hỏi: Thuế này sẽ được sử dụng như thế nào?\n• Hiểu về thuế giúp bạn trở thành công dân tích cực, đóng góp vào xã hội công bằng',
          },
        ] as ContentBlock[],
      },
    },
  ],

  // Level 2: Tại sao đóng thuế?
  level2: [
    {
      name: 'Mục đích của thuế',
      slug: 'muc-dich-cua-thue-v2',
      sortOrder: 1,
      content: {
        title: 'Mục đích của thuế',
        blocks: [
          {
            type: 'callout',
            variant: 'info',
            text: 'Bạn đóng thuế để đổi lại sự an toàn và các dịch vụ công cần thiết mà tự cá nhân hay các bên tư nhân không thể thực hiện một cách hiệu quả.',
          },
          {
            type: 'text',
            title: 'Chính phủ thu thuế để làm gì?',
            paragraphs: [
              'Mục tiêu chính của thuế là tạo nguồn tài chính để Nhà nước duy trì sự tồn tại và thực hiện các chức năng của mình:',
              '• Đảm bảo an ninh và trật tự xã hội: Chi trả cho quân đội, công an, và hệ thống tòa án để bảo vệ an toàn cho người dân.',
              '• Cung cấp dịch vụ công cộng: Xây dựng và duy trì trường học, bệnh viện, đường sá, cầu cống.',
              '• Bảo vệ môi trường và định hướng tiêu dùng: Sử dụng thuế để điều chỉnh hành vi có hại (thuế thuốc lá, rượu bia) hoặc khuyến khích hành vi có lợi.',
              '• Giảm bất bình đẳng và hỗ trợ người yếu thế: Phân phối lại thu nhập thông qua các chương trình phúc lợi xã hội.',
            ],
          },
          {
            type: 'text',
            paragraphs: [
              'Nói cách khác, thuế chính là nền tảng tài chính giúp một quốc gia vận hành ổn định và phục vụ lợi ích chung của toàn xã hội.',
              'Nếu không có thuế, chúng ta sẽ không có trường học công, bệnh viện công, đường xá, cảnh sát bảo vệ an ninh, hay hệ thống tòa án để giải quyết tranh chấp.',
            ],
          },
          {
            type: 'question',
            question: 'Mục đích chính của thuế là gì?',
            options: [
              { id: '1', text: 'Làm giàu cho chính phủ', isCorrect: false },
              { id: '2', text: 'Tạo nguồn tài chính để nhà nước thực hiện các chức năng phục vụ xã hội', isCorrect: true },
              { id: '3', text: 'Trừng phạt người giàu', isCorrect: false },
              { id: '4', text: 'Kiểm soát người dân', isCorrect: false },
            ],
            explanation: 'Thuế là nguồn tài chính chính để nhà nước duy trì hoạt động và cung cấp các dịch vụ công như an ninh, giáo dục, y tế, hạ tầng cho toàn xã hội.',
          },
          {
            type: 'question',
            question: 'Chính phủ dùng thuế để thực hiện chức năng nào sau đây?',
            options: [
              { id: '1', text: 'Chỉ xây dựng quân đội', isCorrect: false },
              { id: '2', text: 'Chỉ trả lương cho công chức', isCorrect: false },
              { id: '3', text: 'An ninh, giáo dục, y tế, hạ tầng, phúc lợi xã hội', isCorrect: true },
              { id: '4', text: 'Chỉ hỗ trợ người nghèo', isCorrect: false },
            ],
            explanation: 'Thuế được dùng cho nhiều chức năng: an ninh trật tự, giáo dục công, y tế công, xây dựng hạ tầng, và các chương trình phúc lợi xã hội.',
          },
          {
            type: 'callout',
            variant: 'success',
            title: '📝 Tổng kết bài học',
            text: '• Thuế là nền tảng tài chính để quốc gia vận hành\n• Chính phủ dùng thuế cho: an ninh, dịch vụ công, bảo vệ môi trường, giảm bất bình đẳng\n• Thuế giúp cung cấp những dịch vụ mà tư nhân không thể thực hiện hiệu quả',
          },
        ] as ContentBlock[],
      },
    },
    {
      name: 'Khế ước xã hội',
      slug: 'khe-uoc-xa-hoi-v2',
      sortOrder: 2,
      content: {
        title: 'Khế ước xã hội',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Thuế không chỉ là một nghĩa vụ tài chính, mà còn là một phần của mối quan hệ niềm tin giữa người dân và chính quyền.',
              'Mối quan hệ này bắt nguồn từ một thỏa thuận ngầm hiểu – khế ước xã hội (social contract).',
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'Oliver Wendell Holmes Jr., Thẩm phán Tối cao tòa án Hoa Kỳ',
            text: '"Việc đóng thuế không chỉ là một nghĩa vụ bắt buộc mà còn là một sự đánh đổi có ý thức. Chúng ta từ bỏ một phần tài sản cá nhân để đổi lấy những lợi ích mà chỉ một xã hội có tổ chức mới có thể cung cấp."',
          },
          {
            type: 'text',
            title: 'Khế ước xã hội hoạt động như thế nào?',
            paragraphs: [
              'Theo khế ước này, người dân đồng ý đóng thuế và tuân thủ pháp luật. Ngược lại, nhà nước có trách nhiệm sử dụng quyền lực và nguồn thu đó để:',
              '• Bảo vệ quyền con người',
              '• Duy trì trật tự xã hội',
              '• Phục vụ lợi ích chung',
              '• Cung cấp an ninh, công lý, hạ tầng và dịch vụ công',
              'Do đó, thuế tạo nên một mối liên hệ trực tiếp và bình đẳng giữa người dân và nhà nước.',
            ],
          },
          {
            type: 'question',
            question: 'Khế ước xã hội trong bối cảnh thuế có nghĩa là gì?',
            options: [
              { id: '1', text: 'Hợp đồng bằng văn bản giữa công dân và nhà nước', isCorrect: false },
              { id: '2', text: 'Thỏa thuận ngầm: Người dân đóng thuế ↔ Nhà nước bảo vệ và phục vụ', isCorrect: true },
              { id: '3', text: 'Luật thuế được quốc hội thông qua', isCorrect: false },
              { id: '4', text: 'Cam kết của chính phủ với quốc tế', isCorrect: false },
            ],
            explanation: 'Khế ước xã hội là thỏa thuận ngầm hiểu: người dân đóng thuế và tuân thủ pháp luật, đổi lại nhà nước có trách nhiệm bảo vệ quyền lợi và cung cấp dịch vụ công.',
          },
          {
            type: 'question',
            question: 'Theo khế ước xã hội, nhà nước có trách nhiệm gì đối với người đóng thuế?',
            options: [
              { id: '1', text: 'Không có trách nhiệm gì cụ thể', isCorrect: false },
              { id: '2', text: 'Bảo vệ quyền con người, duy trì trật tự, phục vụ lợi ích chung', isCorrect: true },
              { id: '3', text: 'Chỉ cần thu thuế đầy đủ', isCorrect: false },
              { id: '4', text: 'Chỉ bảo vệ người giàu', isCorrect: false },
            ],
            explanation: 'Theo khế ước xã hội, nhà nước có trách nhiệm sử dụng tiền thuế để bảo vệ quyền con người, duy trì trật tự xã hội, và phục vụ lợi ích chung của tất cả công dân.',
          },
          {
            type: 'callout',
            variant: 'success',
            title: '📝 Tổng kết bài học',
            text: '• Thuế là một phần của khế ước xã hội giữa người dân và chính quyền\n• Người dân đóng thuế để đổi lấy an ninh, công lý, hạ tầng và dịch vụ công\n• "Tôi đóng thuế, tôi có quyền đòi hỏi và giám sát"',
          },
        ] as ContentBlock[],
      },
    },
    {
      name: 'Nguyên tắc thu thuế',
      slug: 'nguyen-tac-thu-thue-v2',
      sortOrder: 3,
      content: {
        title: 'Nguyên tắc thu thuế',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Một hệ thống thuế tốt cần cân bằng giữa nhiều mục tiêu khác nhau. Dưới đây là ba nguyên tắc chính mà các nhà hoạch định chính sách thường xem xét.',
            ],
          },
          {
            type: 'text',
            title: 'Nguyên tắc 1: Hiệu quả kinh tế',
            paragraphs: [
              'Mục tiêu: Tối đa hóa phúc lợi xã hội và không làm suy yếu nền kinh tế.',
              '• Tính trung lập: Chính sách thuế nên có tác động tối thiểu đến quyết định kinh tế, không làm méo mó thị trường.',
              '• Chi phí quản lý và tuân thủ thấp: Chi phí mà chính phủ bỏ ra để thu thuế và chi phí mà người dân bỏ ra để tuân thủ nên được giữ ở mức tối thiểu.',
              '• Tính linh hoạt: Chính sách thuế cần đủ linh hoạt để thích ứng với những thay đổi của nền kinh tế.',
            ],
          },
          {
            type: 'text',
            title: 'Nguyên tắc 2: Công bằng xã hội',
            paragraphs: [
              'Mục tiêu: Đảm bảo hệ thống thuế công bằng và giúp giảm bất bình đẳng thu nhập.',
              '• Công bằng theo chiều ngang: Những người có cùng khả năng chi trả nên nộp số thuế như nhau.',
              '• Công bằng theo chiều dọc: Những người có khả năng chi trả cao hơn nên đóng góp một phần lớn hơn thu nhập của họ (thuế lũy tiến).',
              '• Tính minh bạch và dễ hiểu: Người dân cần dễ dàng hiểu được các quy định thuế và lý do đằng sau chúng.',
            ],
          },
          {
            type: 'text',
            title: 'Nguyên tắc 3: Quản lý hành chính',
            paragraphs: [
              'Mục tiêu: Đảm bảo hệ thống thuế có thể được thực thi, quản lý và tuân thủ một cách hiệu quả.',
              '• Tính ổn định và chắc chắn: Các quy định thuế không nên thay đổi thường xuyên, tạo sự chắc chắn cho kế hoạch dài hạn.',
              '• Tính khả thi và hiệu quả thu: Chính sách thuế phải có tính thực thi cao, dễ dàng quản lý và thu gom.',
              '• Tính phù hợp: Thuế phải được thiết kế phù hợp với đặc điểm kinh tế, xã hội và văn hóa của mỗi quốc gia.',
            ],
          },
          {
            type: 'question',
            question: 'Nguyên tắc hiệu quả kinh tế trong thu thuế đảm bảo điều gì?',
            options: [
              { id: '1', text: 'Thu được càng nhiều thuế càng tốt', isCorrect: false },
              { id: '2', text: 'Thuế không làm méo mó thị trường và quyết định kinh tế', isCorrect: true },
              { id: '3', text: 'Người giàu đóng nhiều hơn', isCorrect: false },
              { id: '4', text: 'Thuế dễ thu', isCorrect: false },
            ],
            explanation: 'Nguyên tắc hiệu quả kinh tế đảm bảo thuế có tác động tối thiểu đến quyết định kinh tế của cá nhân và doanh nghiệp, tránh làm méo mó thị trường.',
          },
          {
            type: 'question',
            question: 'Công bằng theo chiều dọc trong thuế có nghĩa là gì?',
            options: [
              { id: '1', text: 'Mọi người đóng cùng một số tiền thuế', isCorrect: false },
              { id: '2', text: 'Mọi người đóng cùng một tỷ lệ % thu nhập', isCorrect: false },
              { id: '3', text: 'Người có thu nhập cao hơn đóng tỷ lệ cao hơn', isCorrect: true },
              { id: '4', text: 'Người có thu nhập thấp được miễn thuế hoàn toàn', isCorrect: false },
            ],
            explanation: 'Công bằng theo chiều dọc có nghĩa là người có khả năng chi trả cao hơn nên đóng góp một phần lớn hơn thu nhập của họ, thường thể hiện qua thuế lũy tiến.',
          },
          {
            type: 'question',
            question: 'Tại sao tính ổn định quan trọng trong chính sách thuế?',
            options: [
              { id: '1', text: 'Để chính phủ không phải làm việc nhiều', isCorrect: false },
              { id: '2', text: 'Để người dân và doanh nghiệp có thể lập kế hoạch dài hạn', isCorrect: true },
              { id: '3', text: 'Để không ai phàn nàn', isCorrect: false },
              { id: '4', text: 'Để thu được nhiều thuế hơn', isCorrect: false },
            ],
            explanation: 'Khi quy định thuế ổn định, người dân và doanh nghiệp có thể lập kế hoạch tài chính dài hạn một cách chắc chắn, không lo ngại về những thay đổi đột ngột.',
          },
          {
            type: 'callout',
            variant: 'success',
            title: '📝 Tổng kết bài học',
            text: '• Nguyên tắc hiệu quả kinh tế: Tối thiểu hóa tác động đến quyết định kinh tế\n• Nguyên tắc công bằng xã hội: Người có khả năng cao hơn đóng góp nhiều hơn\n• Nguyên tắc quản lý hành chính: Ổn định, khả thi, phù hợp với đặc điểm quốc gia',
          },
        ] as ContentBlock[],
      },
    },
  ],

  // Level 3: Thuế và Trách nhiệm
  level3: [
    {
      name: 'Thuế và minh bạch',
      slug: 'thue-va-minh-bach-v2',
      sortOrder: 1,
      content: {
        title: 'Thuế và minh bạch',
        blocks: [
          {
            type: 'callout',
            variant: 'info',
            text: 'Minh bạch trong hoạt động thuế là chìa khóa để xây dựng niềm tin xã hội, nâng cao hiệu quả quản lý nhà nước, và đảm bảo công bằng. Nó đảm bảo rằng chính phủ phải chịu trách nhiệm với người dân.',
          },
          {
            type: 'text',
            title: 'Tại sao cần minh bạch?',
            paragraphs: [
              'Thiếu minh bạch từ phía cơ quan quản lý có nghĩa là người dân không biết hoặc không thể giám sát được cách thu, kiểm tra, và sử dụng tiền thuế.',
              'Hệ quả của việc thiếu minh bạch là sự xói mòn lòng tin, dẫn đến tình trạng thất thoát ngân sách công và làm gia tăng mong muốn trốn thuế.',
            ],
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Cảnh báo từ các chuyên gia',
            text: '"Khi người nộp thuế không nhận được thông tin rõ ràng và trách nhiệm giải trình của chính phủ yếu kém, điều này sẽ gây ra sự mất lòng tin và làm gia tăng mong muốn trốn thuế hoàn toàn." — Finance & Reform, 2010',
          },
          {
            type: 'text',
            paragraphs: [
              'Ngược lại, khi người dân tham gia vào việc giám sát, họ có thể thúc đẩy sự minh bạch trên tinh thần xây dựng một xã hội dân sự vững mạnh.',
              'Minh bạch cũng giúp ngăn chặn tham nhũng, đảm bảo tiền thuế được sử dụng đúng mục đích.',
            ],
          },
          {
            type: 'question',
            question: 'Hệ quả của việc thiếu minh bạch trong quản lý thuế là gì?',
            options: [
              { id: '1', text: 'Thu được nhiều thuế hơn', isCorrect: false },
              { id: '2', text: 'Xói mòn lòng tin và gia tăng trốn thuế', isCorrect: true },
              { id: '3', text: 'Người dân hài lòng hơn', isCorrect: false },
              { id: '4', text: 'Giảm chi phí quản lý', isCorrect: false },
            ],
            explanation: 'Khi thiếu minh bạch, người dân mất niềm tin vào hệ thống, dẫn đến tình trạng trốn thuế gia tăng và thất thoát ngân sách công.',
          },
          {
            type: 'question',
            question: 'Minh bạch trong thuế giúp đạt được mục tiêu nào?',
            options: [
              { id: '1', text: 'Chỉ giúp chính phủ thu được nhiều thuế hơn', isCorrect: false },
              { id: '2', text: 'Xây dựng niềm tin, ngăn chặn tham nhũng, đảm bảo công bằng', isCorrect: true },
              { id: '3', text: 'Chỉ giúp người giàu né thuế', isCorrect: false },
              { id: '4', text: 'Giảm số lượng loại thuế', isCorrect: false },
            ],
            explanation: 'Minh bạch trong thuế giúp xây dựng niềm tin giữa người dân và chính quyền, ngăn chặn tham nhũng, và đảm bảo công bằng trong việc thu và sử dụng thuế.',
          },
          {
            type: 'callout',
            variant: 'success',
            title: '📝 Tổng kết bài học',
            text: '• Minh bạch là chìa khóa xây dựng niềm tin giữa người dân và chính quyền\n• Thiếu minh bạch → xói mòn lòng tin → trốn thuế → thất thoát ngân sách\n• Người dân tham gia giám sát giúp xây dựng xã hội dân sự vững mạnh',
          },
        ] as ContentBlock[],
      },
    },
    {
      name: 'Làm sao để có minh bạch?',
      slug: 'lam-sao-de-co-minh-bach-v2',
      sortOrder: 2,
      content: {
        title: 'Làm sao để có minh bạch?',
        blocks: [
          {
            type: 'text',
            title: 'Cách 1: Cung cấp thông tin dễ tiếp cận',
            paragraphs: [
              'Thông tin về nghĩa vụ thuế, tổng doanh thu, và cách chi tiêu ngân sách phải được công khai và dễ hiểu.',
              'Điều này bao gồm việc truyền đạt ngôn ngữ pháp lý phức tạp thành những nội dung đơn giản, liên quan trực tiếp đến trải nghiệm hàng ngày của người dân.',
              'Người dân không chỉ muốn nhận thông tin một chiều, mà còn muốn có không gian để đối thoại và tương tác với các quan chức thuế và chính phủ.',
            ],
          },
          {
            type: 'text',
            title: 'Cách 2: Tạo diễn đàn tham gia của người dân',
            paragraphs: [
              'Cần có các diễn đàn để người dân giải quyết các vấn đề ở cấp địa phương, với cam kết an toàn, bảo mật và ghi nhận ý kiến đóng góp từ cơ quan chính phủ.',
              'Các diễn đàn này hiệu quả nhất khi cho phép ẩn danh và khi chính phủ thể hiện sự lắng nghe và đáp ứng các mối quan tâm của công dân.',
              'Ở quy mô nhỏ tại địa phương, việc hợp tác với các tổ chức xã hội dân sự có thể giúp thúc đẩy niềm tin, đối thoại và chia sẻ kiến thức.',
            ],
          },
          {
            type: 'text',
            title: 'Cách 3: Cải cách thể chế',
            paragraphs: [
              'Một cấu trúc thuế chuẩn cần được thể chế hóa bằng luật và phải minh bạch. Các khoản thu từ cấu trúc này cần được định lượng và công bố.',
              'Các khoản "chi tiêu thuế" (tax expenditure) — tức là các khoản miễn, giảm thuế cho một số đối tượng nhất định — cần được tính vào tổng chi tiêu của chính phủ.',
              'Chỉ khi tất cả các cấu phần ngân sách (doanh thu thực tế, chi tiêu thuế, chi tiêu trực tiếp) được công bố cùng nhau, hệ thống ngân sách mới thực sự minh bạch.',
            ],
          },
          {
            type: 'question',
            question: 'Giải pháp nào giúp tăng tính minh bạch trong quản lý thuế?',
            options: [
              { id: '1', text: 'Giữ bí mật thông tin ngân sách', isCorrect: false },
              { id: '2', text: 'Công khai thông tin dễ hiểu và tạo diễn đàn cho người dân tham gia', isCorrect: true },
              { id: '3', text: 'Chỉ công bố thông tin cho người giàu', isCorrect: false },
              { id: '4', text: 'Tăng thuế để có thêm nguồn thu', isCorrect: false },
            ],
            explanation: 'Minh bạch đạt được khi thông tin được công khai dễ hiểu, và người dân có cơ hội tham gia đóng góp ý kiến thông qua các diễn đàn.',
          },
          {
            type: 'question',
            question: '"Chi tiêu thuế" (tax expenditure) là gì?',
            options: [
              { id: '1', text: 'Chi phí để thu thuế', isCorrect: false },
              { id: '2', text: 'Các khoản miễn, giảm thuế cho một số đối tượng', isCorrect: true },
              { id: '3', text: 'Tiền lương cho cán bộ thuế', isCorrect: false },
              { id: '4', text: 'Chi phí in ấn hóa đơn thuế', isCorrect: false },
            ],
            explanation: 'Chi tiêu thuế là các khoản miễn, giảm thuế mà chính phủ áp dụng cho một số đối tượng. Về bản chất, đây là khoản tiền chính phủ "mất" và cần được tính vào tổng chi tiêu.',
          },
          {
            type: 'callout',
            variant: 'success',
            title: '📝 Tổng kết bài học',
            text: '• Cung cấp thông tin dễ tiếp cận về nghĩa vụ thuế và cách chi tiêu\n• Tạo diễn đàn để người dân tham gia giám sát và góp ý\n• Cải cách thể chế: Công bố đầy đủ các cấu phần ngân sách bao gồm cả "chi tiêu thuế"',
          },
        ] as ContentBlock[],
      },
    },
    {
      name: 'Thuế và chính trị',
      slug: 'thue-va-chinh-tri-v2',
      sortOrder: 3,
      content: {
        title: 'Thuế và chính trị',
        blocks: [
          {
            type: 'callout',
            variant: 'info',
            text: 'Dù bạn phải nộp thuế theo cách nào, việc lựa chọn loại thuế và cách thu thuế có ảnh hưởng sâu sắc và lâu dài đến bạn, cộng đồng, và quốc gia bạn đang sinh sống.',
          },
          {
            type: 'text',
            paragraphs: [
              'Không có hệ thống thuế nào là hoàn hảo. Mỗi quốc gia phải lựa chọn cách đánh thuế dựa trên giá trị mà quốc gia đó theo đuổi.',
              'Đó là lý do tại sao có những quốc gia như Đức sẽ đánh thuế để tái phân phối lại thu nhập, trong khi có những quốc gia như Mỹ sẽ đánh thuế để kích thích khả năng làm giàu.',
            ],
          },
          {
            type: 'text',
            title: 'Thuế gián tiếp và khoảng cách giàu nghèo',
            paragraphs: [
              'Khi một nhà nước thu nhiều thuế gián tiếp (như VAT), thuế được áp dụng với một tỷ lệ giống nhau cho tất cả mọi người.',
              'Điều này có vẻ công bằng, nhưng thực chất lại làm người có thu nhập thấp phải chịu gánh nặng lớn hơn theo tỷ lệ thu nhập.',
              'Ví dụ: Bạn A kiếm 5 triệu/tháng và bạn B kiếm 50 triệu/tháng. Cả hai cùng mua một món hàng và trả 500.000 đồng tiền VAT. Khoản thuế này chiếm 10% thu nhập của bạn A, nhưng chỉ chiếm 1% thu nhập của bạn B.',
            ],
          },
          {
            type: 'text',
            title: 'Thuế trực tiếp và công bằng',
            paragraphs: [
              'Ngược lại, thuế trực tiếp (như thuế thu nhập cá nhân lũy tiến) giúp phân chia gánh nặng công bằng hơn: ai có nhiều đóng nhiều, ai có ít đóng ít.',
              'Điều này giúp giảm khoảng cách giàu nghèo và bảo vệ người có thu nhập thấp.',
              'Điều này không "bất công" với người giàu, bởi chính họ cũng được hưởng lợi từ một xã hội ổn định, an toàn, có hạ tầng tốt, nguồn nhân lực chất lượng và thị trường tiêu dùng rộng lớn hơn.',
            ],
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Lời nguyền tài nguyên (Resource Curse)',
            text: 'Nếu một nhà nước phụ thuộc vào nguồn thu từ thuế của người dân, họ thường có xu hướng minh bạch và có trách nhiệm giải trình hơn. Ngược lại, nếu nhà nước có nguồn thu lớn từ tài nguyên thiên nhiên hoặc viện trợ nước ngoài, họ sẽ ít phụ thuộc vào người dân và ít có động lực minh bạch.',
          },
          {
            type: 'text',
            paragraphs: [
              'Khẩu hiệu lịch sử "No taxation without representation" (Không đánh thuế nếu không có đại diện) phản ánh mối quan hệ này.',
              'Đây là lý do tại sao việc một quốc gia có cơ cấu thuế phụ thuộc vào người dân thường là một dấu hiệu tốt cho sự phát triển của một nền dân chủ lành mạnh.',
            ],
          },
          {
            type: 'question',
            question: 'Tại sao thuế gián tiếp có thể làm tăng khoảng cách giàu nghèo?',
            options: [
              { id: '1', text: 'Vì người giàu phải đóng nhiều hơn', isCorrect: false },
              { id: '2', text: 'Vì thuế chiếm tỷ lệ lớn hơn trong thu nhập của người nghèo', isCorrect: true },
              { id: '3', text: 'Vì người nghèo được miễn thuế', isCorrect: false },
              { id: '4', text: 'Vì thuế gián tiếp chỉ đánh vào người giàu', isCorrect: false },
            ],
            explanation: 'Thuế gián tiếp (như VAT) đánh cùng tỷ lệ cho tất cả. 500.000đ VAT chiếm 10% thu nhập của người có lương 5 triệu, nhưng chỉ 1% với người có lương 50 triệu.',
          },
          {
            type: 'question',
            question: '"Lời nguyền tài nguyên" trong bối cảnh thuế có nghĩa là gì?',
            options: [
              { id: '1', text: 'Quốc gia có tài nguyên sẽ thu được nhiều thuế hơn', isCorrect: false },
              { id: '2', text: 'Nhà nước phụ thuộc tài nguyên ít có động lực minh bạch với người dân', isCorrect: true },
              { id: '3', text: 'Thuế tài nguyên luôn cao hơn các loại thuế khác', isCorrect: false },
              { id: '4', text: 'Người dân phải đóng thuế cho việc khai thác tài nguyên', isCorrect: false },
            ],
            explanation: 'Khi nhà nước có nguồn thu lớn từ tài nguyên, họ ít phụ thuộc vào thuế của dân, do đó ít có động lực phải minh bạch và có trách nhiệm giải trình với người dân.',
          },
          {
            type: 'question',
            question: 'Câu "No taxation without representation" phản ánh điều gì?',
            options: [
              { id: '1', text: 'Người dân muốn được miễn thuế', isCorrect: false },
              { id: '2', text: 'Đóng thuế đi kèm với quyền được đại diện và tham gia vào chính trị', isCorrect: true },
              { id: '3', text: 'Chỉ đại biểu quốc hội mới phải đóng thuế', isCorrect: false },
              { id: '4', text: 'Thuế chỉ nên đánh vào người đại diện', isCorrect: false },
            ],
            explanation: 'Câu này có nghĩa: Nếu người dân phải đóng thuế, họ có quyền được đại diện trong chính quyền và có tiếng nói trong việc sử dụng tiền thuế.',
          },
          {
            type: 'callout',
            variant: 'success',
            title: '📝 Tổng kết bài học',
            text: '• Không có hệ thống thuế hoàn hảo - phụ thuộc vào giá trị quốc gia theo đuổi\n• Thuế gián tiếp có thể làm tăng khoảng cách giàu nghèo\n• Nhà nước phụ thuộc thuế của dân thường minh bạch hơn\n• "No taxation without representation" - Đóng thuế đi kèm với quyền đòi hỏi',
          },
        ] as ContentBlock[],
      },
    },
  ],
};

// ===== MAIN FUNCTION =====

async function main() {
  console.log('🚀 Bắt đầu tạo khóa học "Thuế & Quyền Công Dân" phiên bản nâng cao...\n');

  try {
    // Step 1: Create or find Category
    console.log('📁 Bước 1: Tạo/Tìm Category...');
    let category = await prisma.category.findUnique({
      where: { slug: CATEGORY_DATA.slug },
    });

    if (!category) {
      const maxSortOrder = await prisma.category.aggregate({
        _max: { sortOrder: true },
      });

      category = await prisma.category.create({
        data: {
          ...CATEGORY_DATA,
          sortOrder: (maxSortOrder._max.sortOrder || 0) + 1,
        },
      });
      console.log(`   ✅ Đã tạo category: ${category.name} (${category.id})`);
    } else {
      console.log(`   ℹ️  Category đã tồn tại: ${category.name} (${category.id})`);
    }

    // Step 2: Create Course
    console.log('\n📚 Bước 2: Tạo Course...');
    let course = await prisma.course.findUnique({
      where: { slug: COURSE_DATA.slug },
    });

    if (course) {
      console.log(`   ⚠️  Course đã tồn tại: ${course.name} (${course.id})`);
      console.log('   🗑️  Đang xóa course cũ để tạo lại...');

      // Delete old course (cascade will delete levels, lessons, content)
      await prisma.course.delete({
        where: { id: course.id },
      });
      console.log('   ✅ Đã xóa course cũ');
    }

    const maxCourseSortOrder = await prisma.course.aggregate({
      where: { categoryId: category.id },
      _max: { sortOrder: true },
    });

    course = await prisma.course.create({
      data: {
        ...COURSE_DATA,
        categoryId: category.id,
        sortOrder: (maxCourseSortOrder._max.sortOrder || 0) + 1,
      },
    });
    console.log(`   ✅ Đã tạo course: ${course.name} (${course.id})`);

    // Step 3: Create Levels
    console.log('\n📊 Bước 3: Tạo Levels...');
    const createdLevels: { id: string; name: string; sortOrder: number }[] = [];

    for (const levelData of LEVELS_DATA) {
      const level = await prisma.level.create({
        data: {
          name: levelData.name,
          courseId: course.id,
          sortOrder: levelData.sortOrder,
        },
      });
      createdLevels.push(level);
      console.log(`   ✅ Level ${levelData.sortOrder}: ${level.name}`);
    }

    // Step 4: Create Lessons with Content
    console.log('\n📝 Bước 4: Tạo Lessons và Content...');

    const levelLessonsMap: { [key: string]: typeof LESSONS_DATA.level1 } = {
      level1: LESSONS_DATA.level1,
      level2: LESSONS_DATA.level2,
      level3: LESSONS_DATA.level3,
    };

    let totalLessons = 0;
    let totalQuestions = 0;

    for (let i = 0; i < createdLevels.length; i++) {
      const level = createdLevels[i];
      const levelKey = `level${i + 1}` as keyof typeof levelLessonsMap;
      const lessons = levelLessonsMap[levelKey];

      console.log(`\n   Level ${i + 1}: ${level.name}`);

      for (const lessonData of lessons) {
        // Create lesson
        const lesson = await prisma.lesson.create({
          data: {
            name: lessonData.name,
            slug: lessonData.slug,
            levelId: level.id,
            sortOrder: lessonData.sortOrder,
            isActive: true,
          },
        });

        // Count questions in this lesson
        const questionCount = lessonData.content.blocks.filter(
          (block) => block.type === 'question'
        ).length;
        totalQuestions += questionCount;

        // Create lesson content
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            title: lessonData.content.title,
            blocks: lessonData.content.blocks as unknown as Prisma.InputJsonValue,
          },
        });

        totalLessons++;
        console.log(`      ✅ Lesson ${lessonData.sortOrder}: ${lesson.name} (${questionCount} câu hỏi)`);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('🎉 HOÀN THÀNH!');
    console.log('='.repeat(50));
    console.log(`\n📊 Tổng kết:`);
    console.log(`   - Category: ${category.name}`);
    console.log(`   - Course: ${course.name}`);
    console.log(`   - Levels: ${createdLevels.length}`);
    console.log(`   - Lessons: ${totalLessons}`);
    console.log(`   - Câu hỏi trắc nghiệm: ${totalQuestions}`);
    console.log(`\n🔗 Truy cập:`);
    console.log(`   - Admin: /admin/courses`);
    console.log(`   - Frontend: /courses/${course.slug}`);
    console.log(`   - Quản lý levels: /admin/courses/${course.id}/levels`);
  } catch (error) {
    console.error('\n❌ Lỗi:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
