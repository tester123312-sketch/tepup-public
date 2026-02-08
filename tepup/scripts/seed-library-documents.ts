/**
 * Script to seed sample library documents
 * Run: npx tsx scripts/seed-library-documents.ts
 */

import 'dotenv/config';
import { prisma } from '../lib/prisma';

const sampleDocuments = [
  {
    slug: 'chu-nghia-tu-ban',
    title: 'Chủ nghĩa tư bản',
    description: 'Hệ thống kinh tế dựa trên sở hữu tư nhân về tư liệu sản xuất và vận hành theo cơ chế thị trường tự do.',
    category: 'Định nghĩa',
    content: {
      sections: [
        {
          heading: 'Định nghĩa',
          paragraphs: [
            'Chủ nghĩa tư bản là một hệ thống kinh tế - xã hội trong đó tư liệu sản xuất (như nhà máy, máy móc, đất đai) thuộc sở hữu tư nhân thay vì sở hữu nhà nước hoặc tập thể.',
            'Trong chủ nghĩa tư bản, sản xuất và phân phối hàng hóa được điều tiết chủ yếu bởi cơ chế thị trường tự do, dựa trên quan hệ cung cầu, thay vì bởi kế hoạch hóa tập trung từ nhà nước.',
          ],
        },
        {
          heading: 'Đặc điểm chính',
          paragraphs: [
            'Quyền sở hữu tư nhân: Cá nhân và doanh nghiệp có quyền sở hữu, mua bán, và sử dụng tư liệu sản xuất để tạo ra lợi nhuận.',
            'Thị trường tự do: Giá cả và sản xuất được xác định bởi quan hệ cung cầu trên thị trường, ít có sự can thiệp của nhà nước.',
            'Cạnh tranh: Các doanh nghiệp cạnh tranh với nhau để thu hút khách hàng, thúc đẩy sáng tạo và hiệu quả kinh tế.',
            'Động lực lợi nhuận: Mục tiêu chính của hoạt động kinh tế là tối đa hóa lợi nhuận cho chủ sở hữu.',
          ],
        },
        {
          heading: 'Lịch sử hình thành',
          paragraphs: [
            'Chủ nghĩa tư bản bắt đầu hình thành ở châu Âu từ thế kỷ 16-17 thông qua quá trình công nghiệp hóa và phát triển thương mại quốc tế.',
            'Các nhà tư tưởng như Adam Smith đã đưa ra các lý thuyết nền tảng về thị trường tự do và "bàn tay vô hình" điều tiết nền kinh tế.',
          ],
        },
      ],
      relatedConcepts: [
        'Thị trường tự do',
        'Sở hữu tư nhân',
        'Chủ nghĩa xã hội',
        'Kinh tế thị trường',
        'Cạnh tranh kinh tế',
      ],
      furtherReading: [
        'Lịch sử phát triển chủ nghĩa tư bản từ thế kỷ 16',
        'So sánh chủ nghĩa tư bản và chủ nghĩa xã hội',
        'Vai trò của nhà nước trong nền kinh tế tư bản',
        'Các trường phái kinh tế tư bản chủ nghĩa',
      ],
    },
    sortOrder: 1,
  },
  {
    slug: 'cung-va-cau',
    title: 'Cung và Cầu',
    description: 'Hai lực lượng chính quyết định giá cả và số lượng hàng hóa trong nền kinh tế thị trường.',
    category: 'Khái niệm cơ bản',
    content: {
      sections: [
        {
          paragraphs: [
            'Cung và cầu là hai khái niệm cơ bản nhất trong kinh tế học, giải thích cách thị trường hoạt động và xác định giá cả.',
            'Cung (Supply): Số lượng hàng hóa mà người bán sẵn sàng cung cấp ở mỗi mức giá. Khi giá tăng, người bán thường muốn cung cấp nhiều hơn.',
            'Cầu (Demand): Số lượng hàng hóa mà người mua muốn mua ở mỗi mức giá. Khi giá giảm, người mua thường muốn mua nhiều hơn.',
            'Điểm cân bằng xảy ra khi cung bằng cầu, xác định giá thị trường và số lượng giao dịch. Đây là điểm mà cả người mua và người bán đều hài lòng.',
          ],
        },
      ],
      relatedConcepts: [
        'Giá cân bằng',
        'Đường cung',
        'Đường cầu',
        'Thị trường',
        'Độ co giãn',
      ],
      furtherReading: [
        'Các yếu tố ảnh hưởng đến cung và cầu',
        'Độ co giãn của cung và cầu',
        'Thặng dư người tiêu dùng và người sản xuất',
      ],
    },
    sortOrder: 2,
  },
  {
    slug: 'lam-phat',
    title: 'Lạm phát',
    description: 'Hiện tượng giá cả hàng hóa và dịch vụ tăng liên tục theo thời gian, làm giảm sức mua của đồng tiền.',
    category: 'Kinh tế vĩ mô',
    content: {
      sections: [
        {
          heading: 'Khái niệm',
          paragraphs: [
            'Lạm phát là sự gia tăng liên tục và bền vững của mức giá chung trong nền kinh tế. Nó được đo lường bằng chỉ số giá tiêu dùng (CPI) hoặc chỉ số giá sản xuất (PPI).',
            'Khi lạm phát xảy ra, cùng một số tiền sẽ mua được ít hàng hóa và dịch vụ hơn so với trước đó, tức là sức mua của đồng tiền bị giảm.',
          ],
        },
        {
          heading: 'Nguyên nhân',
          paragraphs: [
            'Lạm phát do cầu kéo: Khi tổng cầu trong nền kinh tế vượt quá khả năng cung ứng, giá cả sẽ tăng lên.',
            'Lạm phát do chi phí đẩy: Khi chi phí sản xuất tăng (như giá nguyên liệu, tiền lương), doanh nghiệp chuyển chi phí này sang người tiêu dùng.',
            'Lạm phát do cung tiền: Khi ngân hàng trung ương in quá nhiều tiền hoặc mở rộng tín dụng quá mức, lượng tiền trong lưu thông tăng nhanh hơn hàng hóa.',
          ],
        },
        {
          heading: 'Tác động',
          paragraphs: [
            'Tác động tiêu cực: Giảm sức mua, tạo bất ổn kinh tế, khó khăn cho người thu nhập cố định, làm méo mó quyết định đầu tư.',
            'Tác động tích cực (lạm phát vừa phải): Khuyến khích chi tiêu và đầu tư, giúp giảm gánh nặng nợ thực tế, tạo môi trường thuận lợi cho tăng trưởng.',
          ],
        },
      ],
      relatedConcepts: [
        'Chỉ số giá tiêu dùng (CPI)',
        'Giảm phát',
        'Siêu lạm phát',
        'Chính sách tiền tệ',
        'Ngân hàng trung ương',
      ],
      furtherReading: [
        'Lịch sử các đợt lạm phát lớn trên thế giới',
        'Cách các ngân hàng trung ương kiểm soát lạm phát',
        'Mối quan hệ giữa lạm phát và thất nghiệp (Đường cong Phillips)',
      ],
    },
    sortOrder: 3,
  },
  {
    slug: 'gdp-gross-domestic-product',
    title: 'GDP (Tổng sản phẩm quốc nội)',
    description: 'Chỉ số đo lường tổng giá trị thị trường của tất cả hàng hóa và dịch vụ cuối cùng được sản xuất trong một quốc gia.',
    category: 'Kinh tế vĩ mô',
    content: {
      sections: [
        {
          heading: 'Định nghĩa',
          paragraphs: [
            'GDP (Gross Domestic Product) là tổng giá trị thị trường của tất cả hàng hóa và dịch vụ cuối cùng được sản xuất trong lãnh thổ một quốc gia trong một khoảng thời gian nhất định (thường là một năm).',
            'GDP chỉ tính hàng hóa và dịch vụ cuối cùng để tránh tính trùng lặp. Ví dụ: Chỉ tính giá trị chiếc bánh mì hoàn thiện, không tính riêng giá trị bột mì đã được dùng để làm bánh.',
          ],
        },
        {
          heading: 'Các cách tính GDP',
          paragraphs: [
            'Phương pháp chi tiêu: GDP = C + I + G + (X - M), trong đó C là tiêu dùng, I là đầu tư, G là chi tiêu chính phủ, X là xuất khẩu, M là nhập khẩu.',
            'Phương pháp thu nhập: Tính tổng thu nhập của tất cả các yếu tố sản xuất (tiền lương, tiền thuê, lãi suất, lợi nhuận).',
            'Phương pháp giá trị gia tăng: Tính tổng giá trị gia tăng ở mỗi khâu sản xuất.',
          ],
        },
        {
          heading: 'Ý nghĩa và hạn chế',
          paragraphs: [
            'GDP là chỉ số quan trọng nhất để đo lường sức khỏe kinh tế và so sánh giữa các quốc gia. Tăng trưởng GDP cao thường đồng nghĩa với nền kinh tế phát triển.',
            'Tuy nhiên, GDP có hạn chế: Không phản ánh phân phối thu nhập, không tính các hoạt động phi chính thức, không đo lường chất lượng cuộc sống hay tác động môi trường.',
          ],
        },
      ],
      relatedConcepts: [
        'GDP thực và GDP danh nghĩa',
        'GDP bình quân đầu người',
        'GNP (Tổng sản phẩm quốc dân)',
        'Tăng trưởng kinh tế',
        'Chu kỳ kinh doanh',
      ],
      furtherReading: [
        'Sự khác biệt giữa GDP và GNP',
        'Các quốc gia có GDP cao nhất thế giới',
        'Các chỉ số bổ sung cho GDP (HDI, GPI)',
      ],
    },
    sortOrder: 4,
  },
  {
    slug: 'that-nghiep',
    title: 'Thất nghiệp',
    description: 'Tình trạng người trong độ tuổi lao động có khả năng và mong muốn làm việc nhưng không tìm được việc làm.',
    category: 'Kinh tế vĩ mô',
    content: {
      sections: [
        {
          heading: 'Khái niệm',
          paragraphs: [
            'Thất nghiệp là tình trạng những người trong độ tuổi lao động, có đủ khả năng làm việc và đang tích cực tìm kiếm việc làm nhưng không có công việc.',
            'Tỷ lệ thất nghiệp được tính bằng số người thất nghiệp chia cho tổng lực lượng lao động (bao gồm cả người có việc làm và người thất nghiệp).',
          ],
        },
        {
          heading: 'Các loại thất nghiệp',
          paragraphs: [
            'Thất nghiệp ma sát: Thất nghiệp ngắn hạn xảy ra khi người lao động chuyển đổi công việc hoặc mới tốt nghiệp đang tìm việc.',
            'Thất nghiệp cơ cấu: Do sự thay đổi cơ cấu kinh tế hoặc công nghệ khiến một số ngành nghề bị loại bỏ trong khi kỹ năng lao động không phù hợp với nhu cầu mới.',
            'Thất nghiệp chu kỳ: Xảy ra trong thời kỳ suy thoái kinh tế khi tổng cầu giảm, doanh nghiệp cắt giảm sản xuất và sa thải nhân viên.',
            'Thất nghiệp mùa vụ: Liên quan đến các công việc theo mùa như nông nghiệp, du lịch.',
          ],
        },
        {
          heading: 'Tác động',
          paragraphs: [
            'Tác động kinh tế: Giảm GDP, lãng phí nguồn lực lao động, giảm thu nhập và tiêu dùng, tăng chi tiêu cho phúc lợi xã hội.',
            'Tác động xã hội: Giảm chất lượng cuộc sống, tăng nghèo đói, gây căng thẳng tâm lý, có thể dẫn đến các vấn đề xã hội như tội phạm.',
          ],
        },
      ],
      relatedConcepts: [
        'Lực lượng lao động',
        'Tỷ lệ tham gia lực lượng lao động',
        'Thất nghiệp tự nhiên',
        'Đường cong Phillips',
        'Chính sách việc làm',
      ],
      furtherReading: [
        'Cách các chính phủ giải quyết vấn đề thất nghiệp',
        'Mối quan hệ giữa thất nghiệp và lạm phát',
        'Tác động của tự động hóa đến thị trường lao động',
      ],
    },
    sortOrder: 5,
  },
];

async function main() {
  console.log('🌱 Seeding library documents...');

  for (const doc of sampleDocuments) {
    const existing = await prisma.libraryDocument.findUnique({
      where: { slug: doc.slug },
    });

    if (existing) {
      console.log(`⏭️  Document "${doc.title}" already exists, skipping...`);
      continue;
    }

    const created = await prisma.libraryDocument.create({
      data: doc,
    });

    console.log(`✅ Created document: ${created.title} (${created.slug})`);
  }

  console.log('🎉 Seeding complete!');
  console.log('\n📚 Created documents:');
  sampleDocuments.forEach((doc, i) => {
    console.log(`${i + 1}. ${doc.title} - ${doc.category}`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
