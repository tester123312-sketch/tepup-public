/**
 * Script to ADD "Của dân, do dân, vì dân" (Dân chủ 101) course to the database.
 *
 * Based on: Oddly Normal Podcast - Episode 14 (Dec 15, 2020)
 * Transcript: transcript_cua_dan_do_dan_vi_dan.txt
 * Shownote: https://oddly-podcast.com/episode/cua-dan-do-dan-vi-dan
 *
 * PHASED APPROACH:
 * - Phase 1 (this run): Course structure + Level 1 content (3 lessons)
 * - Phase 2: Level 2 content (5 lessons on electoral systems)
 * - Phase 3: Level 3 content (4 lessons on power distribution)
 * - Phase 4: Level 4 content (3 lessons on democratic culture)
 *
 * Run with: npx tsx scripts/add-danchu101-course.ts
 */

import 'dotenv/config';
import { prisma } from '../lib/prisma';

// ─────────────────────────────────────────────
// Course structure definition
// ─────────────────────────────────────────────
const DANCHU101_COURSE = {
  slug: 'dan-chu-101',
  name: 'Của dân, do dân, vì dân',
  description:
    'Khám phá các thể chế chính trị, hệ thống bầu cử, phân chia quyền lực và văn hoá dân chủ qua lăng kính podcast Oddly Normal',
  icon: 'users',
  isNew: true,
  levels: [
    {
      name: 'Thể chế chính trị là gì?',
      lessons: [
        { id: 'danchu101-1', name: 'Ai đang cai trị? — 4 loại thể chế chính trị' },
        { id: 'danchu101-2', name: 'Tại sao dân chủ lại "bất thường"?' },
        { id: 'danchu101-3', name: 'Dân chủ trực tiếp vs Dân chủ đại diện' },
      ],
    },
    {
      name: 'Bầu cử — Cuộc chiến của phiếu bầu',
      lessons: [
        { id: 'danchu101-4', name: 'Nghịch lý Condorcet — Ý chí tập thể có tồn tại không?' },
        { id: 'danchu101-5', name: 'First-past-the-post & Spoiler Effect' },
        { id: 'danchu101-6', name: 'Hệ thống hai vòng & Bầu cử ưu tiên' },
        { id: 'danchu101-7', name: 'Gerrymandering — Vẽ bản đồ để thắng' },
        { id: 'danchu101-8', name: 'Định lý Arrow — Không có hệ thống bầu cử hoàn hảo' },
      ],
    },
    {
      name: 'Phân chia quyền lực — Ai kiểm soát ai?',
      lessons: [
        { id: 'danchu101-9', name: 'Tam quyền phân lập' },
        { id: 'danchu101-10', name: 'Liên bang & Phân quyền địa phương' },
        { id: 'danchu101-11', name: 'Kiểm soát & Đối trọng (Checks and Balances)' },
        { id: 'danchu101-12', name: 'Nghị viện lưỡng viện & Bảo vệ thiểu số' },
      ],
    },
    {
      name: 'Văn hoá dân chủ — Hành trình của quyền bầu cử',
      lessons: [
        { id: 'danchu101-13', name: 'Bỏ phiếu công khai vs Bỏ phiếu bí mật' },
        { id: 'danchu101-14', name: 'Lịch sử quyền bầu cử ở Mỹ' },
        { id: 'danchu101-15', name: 'Dân chủ — Hiện tượng bất thường cần bảo vệ' },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Level 1 lesson content
// (Level 2, 3, 4 sẽ được thêm trong các phiên tiếp theo)
// ─────────────────────────────────────────────
const lessonContents: Record<string, { title: string; blocks: any[] }> = {
  // ────────────────────────────────────────────────────────────────
  // LESSON 1: Ai đang cai trị? — 4 loại thể chế chính trị
  // ────────────────────────────────────────────────────────────────
  'danchu101-1': {
    title: 'Ai đang cai trị? — 4 loại thể chế chính trị',
    blocks: [
      {
        type: 'text',
        title: 'Trong bài học này bạn sẽ học được gì?',
        paragraphs: [
          'Năm 2020, cả Việt Nam "dán mắt" theo dõi bầu cử tổng thống Mỹ. Facebook tràn ngập bản đồ đỏ-xanh nhấp nháy, bạn bè bỏ cả buổi sáng làm việc để cá cược Trump hay Biden sẽ thắng.',
          'Tại sao chúng ta lại quan tâm đến chính trị của một đất nước cách xa nửa vòng trái đất? Aristotle đã lý giải điều này từ hơn 2.000 năm trước: "Con người về bản chất là những sinh vật chính trị." Chính trị không phải là thứ gì xa lạ — nó ở trong từng quyết định chúng ta đưa ra, trong từng cộng đồng chúng ta thuộc về.',
          'Trong bài học đầu tiên này, chúng ta sẽ trả lời câu hỏi nền tảng nhất: Có bao nhiêu loại thể chế chính trị? Ai đang cai trị ai — và điều đó có ý nghĩa gì với cuộc sống của chúng ta?',
        ],
      },
      {
        type: 'callout',
        icon: 'quote',
        title: 'Aristotle — Politics',
        text: '"Con người về bản chất là những sinh vật chính trị. Tạo hoá, vốn chẳng bao giờ làm gì mà không có mục đích, đã tạo ra con người sở hữu hai thứ: ngôn ngữ và lý trí. Chính vì nhận thức lý trí và khả năng truyền đạt nhận thức đó mà con người có thể thiết phục, xây dựng liên minh, hợp tác với nhau để tạo nên một gia đình, một thành phố hay một quốc gia."',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Câu hỏi cơ bản: Ai là người cai trị?',
        paragraphs: [
          'Để nhận dạng một thể chế chính trị, chỉ cần hỏi một câu: "Ai là người cai trị?"',
          'Nếu một xã hội không có ai cai trị — kiểu này thường khá loạn — thì được gọi là anarchy (vô chính phủ).',
          'Nếu một xã hội được cai trị bởi một người, thì gọi là autocracy (tập quyền). Autocracy có hai dạng chính: monarchy — một ông vua cai trị bởi "ủy thác thần thánh" từ Chúa hay Allah; và dictatorship — một lãnh đạo độc tài không có xuất thân hoàng tộc, ví dụ như Hitler hay Mussolini.',
          'Nếu một xã hội được cai trị bởi một số ít người, thì gọi là oligarchy (thiểu số trị). Đây là chế độ tương tự như trong phim Hunger Games — một nhóm nhỏ Elite kiểm soát toàn bộ xã hội. Oligarchy còn có các biến thể: aristocracy (quý tộc và tầng lớp elite), plutocracy (tài phiệt giàu có), và military junta (tướng tá quân đội). Myanmar là ví dụ điển hình của military junta, với chế độ độc tài quân sự kéo dài suốt 50 năm.',
          'Và cuối cùng, nếu xã hội được cai trị bởi rất nhiều người — mọi người đều được tham gia — thì gọi là democracy (dân chủ).',
        ],
      },
      {
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Democracy_Index_2022.svg',
        alt: 'Bản đồ chỉ số dân chủ toàn cầu 2022 — màu xanh đậm là dân chủ hoàn toàn, xanh nhạt là dân chủ khiếm khuyết, vàng là chế độ hỗn hợp, đỏ là chế độ độc tài',
        caption:
          'Chỉ số dân chủ toàn cầu 2022 (Economist Intelligence Unit). Trên thế giới hiện nay, các thể chế chính trị phân bổ rất không đồng đều. Nguồn: Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        type: 'callout',
        icon: 'info',
        title: '4 loại thể chế chính trị — Tóm tắt',
        text: '• Anarchy (Vô chính phủ): Không có ai cai trị\n• Autocracy (Tập quyền — 1 người cai trị):\n  → Monarchy: vua/hoàng đế được "thần thánh ủy quyền"\n  → Dictatorship: lãnh đạo độc tài\n• Oligarchy (Thiểu số trị — nhóm nhỏ cai trị):\n  → Aristocracy: tầng lớp quý tộc/elite\n  → Plutocracy: tài phiệt giàu có\n  → Military Junta: tướng tá quân đội\n• Democracy (Dân chủ): Tất cả/nhiều người cùng tham gia',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Dân chủ — Một hiện tượng tương đối mới',
        paragraphs: [
          'Bạn có thể nghĩ dân chủ là điều hiển nhiên. Nhưng thực ra, trong phần lớn lịch sử loài người, quân chủ (monarchy) mới là thể chế chiếm ưu thế — trong hàng nghìn năm.',
          'Dân chủ chỉ trở thành thể chế phổ biến trong khoảng 200-300 năm trở lại đây. Rất nhiều nước từng có thể chế dân chủ từ thời cổ đại — như Hy Lạp và La Mã — đã chuyển sang quân chủ trong một thời gian rất dài, rồi mới quay về dân chủ trong thời hiện đại.',
          'Điều này có nghĩa là dân chủ không phải là "điều mặc định" của xã hội loài người. Nó là một thành tựu khó khăn, phải được xây dựng và bảo vệ một cách cẩn thận.',
        ],
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Các hình thức chính phủ',
        description: 'Tổng quan về các hình thức tổ chức chính quyền trong lịch sử và hiện đại',
        category: 'Chính trị học',
        estimatedReadTime: '5 phút',
        documentContent: {
          sections: [
            {
              heading: 'Phân loại theo người nắm quyền',
              paragraphs: [
                'Chính trị học phân loại các thể chế chính trị theo câu hỏi "ai nắm quyền lực": không ai (anarchy), một người (autocracy), một nhóm nhỏ (oligarchy), hay đa số/tất cả (democracy).',
                'Trong lịch sử, autocracy và oligarchy là những hình thức phổ biến nhất. Democracy — đặc biệt là democracy đại diện — chỉ trở nên phổ biến rộng rãi từ thế kỷ 19-20.',
              ],
            },
            {
              heading: 'Các biến thể của Oligarchy',
              paragraphs: [
                'Aristocracy: quyền lực thuộc về tầng lớp quý tộc, được xác định bởi dòng tộc hoặc địa vị xã hội.',
                'Plutocracy: quyền lực thuộc về người giàu — ví dụ như các "oligarchs" ở Nga sau khi Liên Xô tan rã.',
                'Military Junta: quyền lực thuộc về quân đội — điển hình là Myanmar trong hầu hết thế kỷ 20 và đến nay.',
              ],
            },
          ],
          relatedConcepts: ['Democracy', 'Autocracy', 'Oligarchy', 'Separation of powers'],
          furtherReading: [
            'https://en.wikipedia.org/wiki/Government',
            'https://en.wikipedia.org/wiki/Democracy',
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — Bạn đã học được gì?',
        text: '✓ 4 loại thể chế chính trị: Anarchy, Autocracy, Oligarchy, Democracy\n✓ Autocracy bao gồm: Monarchy (quân chủ) và Dictatorship (độc tài)\n✓ Oligarchy bao gồm: Aristocracy, Plutocracy, Military Junta\n✓ Dân chủ chỉ phổ biến trong ~200-300 năm gần đây',
        variant: 'success',
      },
      {
        type: 'question',
        question:
          'Theo cách phân loại trong podcast, chế độ quân sự ở Myanmar kéo dài 50 năm là ví dụ của thể chế nào?',
        options: [
          { id: 'a', text: 'Autocracy — vì có một lãnh đạo tối cao', isCorrect: false },
          {
            id: 'b',
            text: 'Oligarchy (dạng Military Junta) — vì một nhóm tướng tá quân đội nắm quyền',
            isCorrect: true,
          },
          { id: 'c', text: 'Monarchy — vì có truyền thống cai trị lâu dài', isCorrect: false },
          { id: 'd', text: 'Democracy — vì họ vẫn tổ chức bầu cử định kỳ', isCorrect: false },
        ],
        explanation:
          'Chế độ quân sự ở Myanmar là ví dụ điển hình của "military junta" — một dạng oligarchy trong đó quyền lực nằm trong tay một nhóm các tướng tá quân đội (một nhóm nhỏ, không phải một người). Dù có thể có một nhân vật lãnh đạo nổi bật, quyền lực thực chất phân bổ trong hàng ngũ quân đội cấp cao.',
      },
      {
        type: 'text',
        title: 'Tổng kết',
        paragraphs: [
          'Trong bài học này, chúng ta đã tìm hiểu cách phân loại các xã hội theo câu hỏi "Ai đang cai trị?" — và câu trả lời dẫn đến 4 loại thể chế: anarchy, autocracy, oligarchy, và democracy.',
          'Dân chủ nghe có vẻ hiển nhiên, nhưng thực ra nó là một thành tựu tương đối mới và hiếm có trong lịch sử loài người. Vậy điều gì làm cho dân chủ trở nên đặc biệt đến vậy?',
          'Bài học tiếp theo sẽ trả lời câu hỏi đó: "Tại sao dân chủ lại là thể chế đặc biệt?"',
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // LESSON 2: Tại sao dân chủ lại "bất thường"?
  // ────────────────────────────────────────────────────────────────
  'danchu101-2': {
    title: 'Tại sao dân chủ lại "bất thường"?',
    blocks: [
      {
        type: 'text',
        title: 'Trong bài học này bạn sẽ học được gì?',
        paragraphs: [
          'Bài trước chúng ta đã biết 4 loại thể chế chính trị. Dân chủ có vẻ là lựa chọn hiển nhiên nhất — ai cũng muốn được sống trong một xã hội mà mình có tiếng nói.',
          'Nhưng tại sao podcast Oddly Normal lại gọi dân chủ là "bất thường" (oddly normal)? Hãy cùng tìm hiểu điều gì làm cho dân chủ thực sự đặc biệt — và tại sao nó đáng được bảo vệ hơn bất kỳ thứ gì khác.',
          'Trong bài học này, chúng ta sẽ phân tích lợi ích của dân chủ ở cả hai cấp độ: cá nhân và cộng đồng — đồng thời tìm hiểu tại sao dân chủ lại là hiện tượng hiếm có trong lịch sử.',
        ],
      },
      {
        type: 'callout',
        icon: 'star',
        title: 'Nguyên tắc trung tâm của dân chủ',
        text: '"Dân chủ cho phép sự thay đổi trong xã hội mà không cần dùng đến bạo lực."\n\nĐây là điểm khác biệt căn bản nhất giữa dân chủ và các thể chế khác.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Lợi ích của dân chủ ở cấp độ cá nhân',
        paragraphs: [
          'Ở góc độ cá nhân, dân chủ cho phép bạn tự do hơn — được quyết định cuộc đời của mình mà không lo bị "chém đầu", được phát biểu ý kiến dù ý kiến đó có thể khác với những người khác.',
          'Nói ngắn gọn, đó là các quyền con người cơ bản: quyền tự do ngôn luận, tự do hội họp, tự do bầu cử, và quyền được bảo vệ bởi pháp luật bình đẳng.',
          'Trong xã hội quân chủ hay độc tài, những quyền này không tồn tại — hoặc chỉ tồn tại trên giấy tờ. Ở chế độ quân chủ tuyệt đối, nhà vua nắm quyền lực tối cao được "ủy thác từ thần thánh" — ý kiến của dân không có trọng lượng.',
        ],
      },
      {
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Democracy_Index_2022.svg',
        alt: 'Bản đồ chỉ số dân chủ toàn cầu năm 2022 — thể hiện mức độ dân chủ của các quốc gia trên thế giới theo thang điểm của Economist Intelligence Unit',
        caption:
          'Chỉ số dân chủ 2022: Xanh đậm = Dân chủ hoàn toàn. Xanh nhạt = Dân chủ khiếm khuyết. Vàng = Chế độ hỗn hợp. Đỏ = Chế độ độc tài. Nhìn vào bản đồ, ta thấy rõ dân chủ vẫn không phải "mặc định" của thế giới. Nguồn: Wikimedia Commons (CC BY-SA)',
      },
      {
        type: 'callout',
        icon: 'warning',
        title: 'Sự thật bất ngờ',
        text: 'Dân chủ chỉ trở thành thể chế phổ biến trong khoảng 200-300 năm trở lại đây — một khoảng thời gian rất ngắn so với hàng nghìn năm lịch sử nhân loại. Nhiều nơi từng có dân chủ (Hy Lạp, La Mã cổ đại) rồi lại quay về quân chủ trong hàng thế kỷ, trước khi trở lại dân chủ ở thời hiện đại.',
        variant: 'warning',
      },
      {
        type: 'text',
        title: 'Lợi ích lớn nhất — Thay đổi hòa bình',
        paragraphs: [
          'Ở góc độ cộng đồng, lợi ích lớn nhất của dân chủ là: cho phép thay đổi hòa bình.',
          'Hãy tưởng tượng: trong quá khứ, nếu muốn lật đổ một ông bạo chúa hay một ông vua bất tài, người ta phải phất cờ khởi nghĩa, đánh nhau, đổ máu, gây thiệt hại to lớn.',
          'Còn ngày nay, trong xã hội dân chủ, nếu người ta muốn đổi người cầm quyền, họ chỉ cần đi bầu thôi. "Thay vì ném đá vỡ đầu nhau thì giờ chỉ phải ném giấy thôi."',
          'Cái sự thay đổi, chuyển giao quyền lực một cách hòa bình, dễ dàng, nhanh chóng này cho phép một điều rất quan trọng: sự thương lượng liên tục giữa các nhóm khác nhau trong xã hội — mà không cần đến bạo lực.',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: '3 điều kiện để xã hội đa dạng sống chung hòa bình',
        text: 'Khi những con người thuộc các tôn giáo, giai cấp, lý tưởng và giá trị quan khác nhau sống chung, họ cần:\n\n1. Sự bình đẳng — mọi người đều có tiếng nói như nhau\n2. Cơ chế đưa ra quyết định chung — một cách để đồng thuận\n3. Cơ chế tạo ra sự thay đổi — để các nhóm có thể thương lượng liên tục mà không cần bạo lực',
        variant: 'info',
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Dân chủ đại diện',
        description: 'Hệ thống trong đó công dân bầu ra đại diện để thay mặt họ đưa ra quyết định',
        category: 'Chính trị học',
        estimatedReadTime: '5 phút',
        documentContent: {
          sections: [
            {
              heading: 'Dân chủ đại diện là gì?',
              paragraphs: [
                'Dân chủ đại diện (representative democracy) là hệ thống trong đó công dân không trực tiếp đưa ra quyết định, mà bầu ra đại diện — nghị sĩ, tổng thống, thị trưởng, v.v. — để làm điều đó thay cho họ.',
                'Đây là hình thức phổ biến nhất của dân chủ hiện đại. Lý do: không thể lấy ý kiến hàng triệu người cho mọi quyết định của nhà nước.',
              ],
            },
            {
              heading: 'Tại sao lại cần đại diện?',
              paragraphs: [
                'Chi phí tổ chức bầu cử toàn quốc rất lớn. Ước tính chi phí bầu cử tổng thống Mỹ 2020 lên đến hơn 10 tỷ đô la — và đó chỉ là một cuộc bầu cử.',
                'Ngoài ra, với các vấn đề phức tạp (như Brexit, chính sách thương mại quốc tế), không phải ai cũng có đủ thông tin và chuyên môn để ra quyết định sáng suốt.',
                'Vì thế, người ta ủy thác quyền quyết định cho những người được cho là có đủ kiến thức và sự tín nhiệm — giống như trong lịch sử Việt Nam, người dân ủy thác cho "trưởng làng" — bô lão uyên thâm, từng trải.',
              ],
            },
          ],
          relatedConcepts: ['Direct democracy', 'Electoral systems', 'Separation of powers'],
          furtherReading: ['https://en.wikipedia.org/wiki/Representative_democracy'],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — Bạn đã học được gì?',
        text: '✓ Dân chủ đặc biệt vì cho phép thay đổi xã hội mà không cần bạo lực\n✓ Cấp độ cá nhân: tự do ngôn luận, quyền con người, quyền bầu cử\n✓ Cấp độ cộng đồng: thương lượng hòa bình, chuyển giao quyền lực ổn định\n✓ 3 điều kiện sống chung: bình đẳng, cơ chế quyết định, cơ chế thay đổi\n✓ Dân chủ là thành tựu hiếm có — chỉ phổ biến trong ~200-300 năm gần đây',
        variant: 'success',
      },
      {
        type: 'question',
        question:
          'Lợi ích cộng đồng quan trọng nhất của dân chủ, theo podcast Oddly Normal, là gì?',
        options: [
          { id: 'a', text: 'Mọi người đều có quyền ứng cử và trở thành lãnh đạo', isCorrect: false },
          {
            id: 'b',
            text: 'Cho phép thay đổi xã hội và chuyển giao quyền lực mà không cần bạo lực',
            isCorrect: true,
          },
          { id: 'c', text: 'Bảo đảm mọi quyết định đều theo ý kiến của đa số tuyệt đối', isCorrect: false },
          { id: 'd', text: 'Chính phủ phải phục vụ nhân dân 100% theo đúng nguyện vọng', isCorrect: false },
        ],
        explanation:
          'Podcast nhấn mạnh rằng lợi ích cộng đồng lớn nhất của dân chủ là cho phép thay đổi hòa bình. "Thay vì ném đá vỡ đầu nhau thì giờ chỉ phải ném giấy thôi" — câu này tóm tắt rất hay bản chất của cuộc bầu cử. Đây là lý do tại sao chuyển giao quyền lực hòa bình là một trong những thành tựu quý giá nhất của dân chủ.',
      },
      {
        type: 'text',
        title: 'Tổng kết',
        paragraphs: [
          'Dân chủ không chỉ đơn giản là "mọi người cùng bầu" — đó là một cơ chế phức tạp cho phép xã hội đa dạng sống chung và thay đổi một cách hòa bình, có trật tự.',
          'Nhưng nếu dân chủ có nghĩa là "người dân làm chủ", thì cụ thể người dân sẽ làm chủ như thế nào? Bầu trực tiếp cho từng quyết định? Hay bầu đại diện? Và hai cách này khác nhau như thế nào?',
          'Những câu hỏi này sẽ được giải đáp trong bài học tiếp theo: "Dân chủ trực tiếp vs Dân chủ đại diện".',
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // LESSON 3: Dân chủ trực tiếp vs Dân chủ đại diện
  // ────────────────────────────────────────────────────────────────
  'danchu101-3': {
    title: 'Dân chủ trực tiếp vs Dân chủ đại diện',
    blocks: [
      {
        type: 'text',
        title: 'Trong bài học này bạn sẽ học được gì?',
        paragraphs: [
          'Nếu dân chủ có nghĩa là "người dân làm chủ", thì có hai cách để thực hiện điều đó: (1) để mọi người tự bỏ phiếu cho từng quyết định — gọi là dân chủ trực tiếp; hoặc (2) bầu ra đại diện để quyết định thay — gọi là dân chủ đại diện.',
          'Mỗi mô hình đều có ưu và nhược điểm riêng. Trong bài này, chúng ta sẽ phân tích cả hai — và tìm hiểu tại sao hầu hết các xã hội hiện đại chọn mô hình đại diện nhưng vẫn giữ lại một phần trực tiếp.',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Hai mô hình dân chủ',
        text: 'Direct Democracy (Dân chủ trực tiếp):\nNgười dân trực tiếp bỏ phiếu cho từng quyết định quan trọng. Kết quả bầu cử phản ánh trực tiếp ý chí của cử tri.\n\nRepresentative Democracy (Dân chủ đại diện):\nNgười dân bầu ra đại diện (nghị sĩ, tổng thống), và các đại diện đó sẽ đưa ra quyết định thay cho họ.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Dân chủ trực tiếp — Lý tưởng và những giới hạn',
        paragraphs: [
          'Dân chủ trực tiếp là hình thức lý tưởng nhất: mọi người đều có tiếng nói trực tiếp, không có trung gian, không có nguy cơ đại diện làm sai lệch ý muốn của cử tri.',
          'Ví dụ nhỏ: Nhóm 3 người trong gia đình quyết định hôm nay đi đâu ăn gì — mọi người đều nói ý kiến, cả nhóm đồng thuận. Đơn giản, công bằng. Nhưng khi quy mô tăng lên — 30 người trong lớp học, rồi 3 triệu, 300 triệu người — thì chi phí và độ phức tạp tăng theo cấp số nhân.',
          'Người ta ước tính chi phí của cuộc bầu cử Mỹ năm 2020 lên tới hơn 10 tỷ đô la — chỉ để lấy ý kiến về một vị trí. Rõ ràng không thể tổ chức mức đó cho mọi quyết định của nhà nước.',
          'Vì vậy, dân chủ trực tiếp chỉ được áp dụng cho những quyết định quan trọng nhất, ví dụ như bầu nguyên thủ quốc gia, hoặc trưng cầu dân ý lớn như Brexit — Anh rời khỏi Liên minh Châu Âu.',
        ],
      },
      {
        type: 'callout',
        icon: 'warning',
        title: 'Nguy cơ tiềm ẩn của dân chủ trực tiếp',
        text: 'Ngoài chi phí cao, dân chủ trực tiếp còn có những nguy cơ sâu xa hơn:\n\n• Số đông có thể bị thao túng bởi propaganda, tin giả (fake news), misinformation\n• Các nhà lãnh đạo demagogue (mị dân) như Napoleon hay Hitler từng hô hào, kích động, khiến người dân mù quáng tin theo\n• Thuật toán mạng xã hội ngày nay tạo ra "bong bóng thông tin" — liên tục đưa ra những gì người dùng thích nhìn, tư duy đa chiều ngày càng khó hơn',
        variant: 'warning',
      },
      {
        type: 'text',
        title: 'Dân chủ đại diện — Thực tế hơn, nhưng có rủi ro',
        paragraphs: [
          'Để giải quyết vấn đề chi phí và quy mô, hầu hết các xã hội dân chủ hiện đại áp dụng mô hình đại diện. Mỗi nhóm công dân chọn ra người đại diện — người này được ủy quyền để đưa ra quyết định thay cho cả nhóm.',
          'Trong đời sống hàng ngày, lớp trưởng trong lớp học chính là hình thức sơ khai nhất của dân chủ đại diện. Ở lịch sử Việt Nam, Hội nghị Diên Hồng là ví dụ nổi tiếng — các bô lão đại diện cho nhân dân được triệu tập để quyết định chính sách quan trọng.',
          'Tuy nhiên, dân chủ đại diện cũng có nhược điểm nghiêm trọng. Câu hỏi đặt ra: liệu người đại diện có thực sự hiểu nguyện vọng của hàng ngàn, hàng triệu cử tri mà mình đại diện? Và ngay cả khi hiểu, họ có muốn làm theo không?',
          'Có hai tình huống xấu có thể xảy ra: (1) Đại diện hiểu nguyện vọng cử tri nhưng biết điều đó không tốt, và chọn không làm theo — giống như cho bọn trẻ tự quyết định hôm nay đi học hay đi chơi. (2) Đại diện hiểu nguyện vọng nhưng vì tham nhũng, lợi ích cá nhân hoặc thiên kiến, bỏ phiếu đi ngược lại.',
        ],
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Dân chủ trực tiếp',
        description: 'Hình thức dân chủ trong đó công dân trực tiếp bỏ phiếu quyết định chính sách',
        category: 'Chính trị học',
        estimatedReadTime: '5 phút',
        documentContent: {
          sections: [
            {
              heading: 'Lịch sử dân chủ trực tiếp',
              paragraphs: [
                'Dân chủ trực tiếp (direct democracy) là hình thức chính quyền trong đó người dân trực tiếp biểu quyết về các vấn đề chính sách và pháp luật, thay vì thông qua đại diện được bầu cử.',
                'Hình thức thuần túy nhất từng tồn tại ở Athens cổ đại vào thế kỷ 5 TCN, nơi công dân nam (khoảng 30.000 người) trực tiếp tham dự Hội đồng nhân dân (Ecclesia) để bỏ phiếu về các vấn đề quốc gia.',
              ],
            },
            {
              heading: 'Các hình thức hiện đại',
              paragraphs: [
                'Referendum (trưng cầu dân ý): công dân bỏ phiếu trực tiếp về một vấn đề cụ thể. Ví dụ nổi bật: Brexit 2016 tại Anh, hay trưng cầu dân ý độc lập Scotland.',
                'Initiative (sáng kiến dân chủ): công dân có thể đề xuất luật mới bằng cách thu thập đủ chữ ký. Phổ biến ở một số bang của Mỹ và Thụy Sĩ.',
                'Thụy Sĩ là quốc gia áp dụng dân chủ trực tiếp nhiều nhất thế giới hiện đại — công dân có thể yêu cầu trưng cầu về bất kỳ luật nào của quốc hội.',
              ],
            },
          ],
          relatedConcepts: ['Representative democracy', 'Referendum', 'Voting systems'],
          furtherReading: ['https://en.wikipedia.org/wiki/Direct_democracy'],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — So sánh hai mô hình',
        text: 'Dân chủ trực tiếp:\n✓ Phản ánh đúng nhất nguyện vọng cử tri\n✗ Rất tốn kém và khó thực hiện ở quy mô lớn\n✗ Dễ bị thao túng bởi propaganda và mạng xã hội\n\nDân chủ đại diện:\n✓ Thực tế hơn — tiết kiệm thời gian và nguồn lực\n✓ Có thể chọn người có chuyên môn để quyết định\n✗ Rủi ro người đại diện không làm theo nguyện vọng cử tri\n✗ Tham nhũng và lợi ích nhóm',
        variant: 'success',
      },
      {
        type: 'question',
        question:
          'Tại sao podcast cho rằng dân chủ trực tiếp khó thực hiện ở xã hội quy mô lớn?',
        options: [
          {
            id: 'a',
            text: 'Vì người đại diện luôn đưa ra quyết định tốt hơn người dân bình thường',
            isCorrect: false,
          },
          {
            id: 'b',
            text: 'Vì chi phí và nguồn lực để tổ chức bỏ phiếu cho mọi quyết định là quá lớn',
            isCorrect: true,
          },
          {
            id: 'c',
            text: 'Vì người dân không đủ trình độ học vấn để tự quyết định',
            isCorrect: false,
          },
          {
            id: 'd',
            text: 'Vì Hiến pháp của hầu hết các nước cấm dân chủ trực tiếp',
            isCorrect: false,
          },
        ],
        explanation:
          'Podcast nhấn mạnh vấn đề chi phí và quy mô: "Chi phí của cuộc bầu cử Mỹ 2020 lên đến hơn 10 tỷ đô la." Rõ ràng không thể tổ chức mức chi phí đó cho mọi quyết định. Ngoài ra còn có vấn đề thông tin — với những quyết định phức tạp như Brexit, liệu mọi cử tri có đủ thông tin để ra quyết định đúng? Câu trả lời đúng là C — không phải vì dân "kém thông minh" mà vì đây là bài toán cấu trúc của quy mô.',
      },
      {
        type: 'text',
        title: 'Tổng kết Level 1 và nhìn về phía trước',
        paragraphs: [
          'Trong Level 1 này, chúng ta đã khám phá nền tảng của thể chế chính trị: từ 4 loại thể chế (anarchy, autocracy, oligarchy, democracy), lý do dân chủ đặc biệt (thay đổi hòa bình), đến hai mô hình dân chủ (trực tiếp và đại diện).',
          'Nhưng đây mới chỉ là phần nổi của tảng băng. Giả sử chúng ta đã có mô hình đại diện — vậy bầu như thế nào mới công bằng? Luật bầu cử nào là tốt nhất? Và ai quyết định luật chơi?',
          'Đây chính là những câu hỏi của Level 2: "Bầu cử — Cuộc chiến của phiếu bầu". Chúng ta sẽ bắt đầu với một nghịch lý toán học rất thú vị: Nghịch lý Condorcet — liệu "ý chí tập thể" có thực sự tồn tại không?',
        ],
      },
    ],
  },
};

// ─────────────────────────────────────────────
// Main script
// ─────────────────────────────────────────────
async function main() {
  console.log('=== Adding "Của dân, do dân, vì dân" course (Phase 1: Level 1 content) ===\n');

  // 1. Ensure 'politics' category exists (create if missing)
  console.log('Setting up category "politics"...');
  let category = await prisma.category.findUnique({ where: { slug: 'politics' } });
  if (!category) {
    const maxSortOrder = await prisma.category.aggregate({ _max: { sortOrder: true } });
    category = await prisma.category.create({
      data: {
        slug: 'politics',
        name: 'Chính trị & Xã hội',
        description: 'Dân chủ, thể chế chính trị, quyền công dân và vai trò của nhà nước',
        icon: 'users',
        sortOrder: (maxSortOrder._max.sortOrder ?? -1) + 1,
        isActive: true,
      },
    });
    console.log(`  ✅ Created category: ${category.name} (slug: ${category.slug})\n`);
  } else {
    console.log(`  Found existing category: ${category.name} (${category.id})\n`);
  }

  // 2. Check for duplicate course
  const existing = await prisma.course.findUnique({ where: { slug: 'dan-chu-101' } });
  if (existing) {
    console.log('⚠️  Course "dan-chu-101" already exists! Skipping to avoid duplicates.');
    console.log('    Delete it manually first if you want to recreate it.');
    return;
  }

  // 3. Get sort order for new course
  const maxCourseSortOrder = await prisma.course.aggregate({
    where: { categoryId: category.id },
    _max: { sortOrder: true },
  });
  const courseSortOrder = (maxCourseSortOrder._max.sortOrder ?? -1) + 1;

  // 4. Create course
  const course = await prisma.course.create({
    data: {
      slug: DANCHU101_COURSE.slug,
      name: DANCHU101_COURSE.name,
      description: DANCHU101_COURSE.description,
      icon: DANCHU101_COURSE.icon,
      isNew: DANCHU101_COURSE.isNew,
      isActive: true,
      categoryId: category.id,
      sortOrder: courseSortOrder,
    },
  });
  console.log(`✅ Created course: ${course.name} (slug: ${course.slug})\n`);

  // 5. Create levels and lessons
  for (let levelIndex = 0; levelIndex < DANCHU101_COURSE.levels.length; levelIndex++) {
    const lvlDef = DANCHU101_COURSE.levels[levelIndex];
    const level = await prisma.level.create({
      data: {
        name: lvlDef.name,
        courseId: course.id,
        sortOrder: levelIndex,
      },
    });
    console.log(`  📁 Level ${levelIndex + 1}: ${level.name}`);

    for (let lessonIndex = 0; lessonIndex < lvlDef.lessons.length; lessonIndex++) {
      const lesDef = lvlDef.lessons[lessonIndex];
      const lesson = await prisma.lesson.create({
        data: {
          slug: lesDef.id,
          name: lesDef.name,
          levelId: level.id,
          sortOrder: lessonIndex,
          isActive: true,
        },
      });
      console.log(`    📄 Lesson: ${lesson.name} (slug: ${lesson.slug})`);

      // Add content if available (Phase 1: only Level 1 lessons have content)
      const content = lessonContents[lesDef.id];
      if (content) {
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            title: content.title,
            blocks: content.blocks as any,
          },
        });
        console.log(`      ✍️  Content added (${content.blocks.length} blocks)`);
      } else {
        console.log(`      ⏳  No content yet (will be added in a future phase)`);
      }
    }
  }

  // 6. Summary
  console.log('\n' + '='.repeat(60));
  console.log('✅ Phase 1 complete!');
  console.log('='.repeat(60));

  const lessonCount = await prisma.lesson.count({
    where: { level: { courseId: course.id } },
  });
  const contentCount = await prisma.lessonContent.count({
    where: { lesson: { level: { courseId: course.id } } },
  });

  console.log(`  Total lessons created : ${lessonCount}`);
  console.log(`  Lessons with content  : ${contentCount} (Level 1 only)`);
  console.log(`  Lessons without content: ${lessonCount - contentCount} (Levels 2-4)`);
  console.log('\n📝 Next steps:');
  console.log('  Phase 2 — Add Level 2 content: Bầu cử & phương thức bỏ phiếu (5 lessons)');
  console.log('  Phase 3 — Add Level 3 content: Phân chia quyền lực (4 lessons)');
  console.log('  Phase 4 — Add Level 4 content: Văn hoá dân chủ (3 lessons)');
}

main()
  .catch((e) => {
    console.error('Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
