import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🏛️ Seeding course: Chính trị là gì? Học thuyết chính trị...\n');

  // 1. Find category "politics"
  const category = await prisma.category.findUnique({ where: { slug: 'politics' } });
  if (!category) {
    throw new Error('Category "politics" not found. Please create it first.');
  }
  console.log(`Found category: ${category.name} (${category.id})`);

  // 2. Create Course
  const course = await prisma.course.upsert({
    where: { slug: 'chinh-tri-101' },
    update: {},
    create: {
      slug: 'chinh-tri-101',
      name: 'Chính trị là gì? Học thuyết chính trị',
      description: 'Khám phá các khái niệm nền tảng về chính trị, nhà nước, thể chế, và hệ thống chính trị Việt Nam.',
      icon: 'landmark',
      isNew: true,
      isActive: true,
      categoryId: category.id,
      sortOrder: 0,
    },
  });
  console.log(`Course created: ${course.name} (${course.id})\n`);

  // ============================================================
  // LEVEL 1: Chính trị là gì?
  // ============================================================
  const level1 = await prisma.level.create({
    data: {
      name: 'Chính trị là gì?',
      courseId: course.id,
      sortOrder: 0,
    },
  });
  console.log(`Level 1 created: ${level1.name}`);

  // --- Lesson 1.1: Chính trị là gì? ---
  const lesson1_1 = await prisma.lesson.create({
    data: {
      slug: 'chinh-tri-la-gi',
      name: 'Chính trị là gì?',
      levelId: level1.id,
      sortOrder: 0,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson1_1.id,
      title: 'Chính trị là gì?',
      blocks: [
        {
          type: 'text',
          title: 'Chính trị — Không chỉ là chuyện "trên ti vi"',
          paragraphs: [
            'Nhiều người thường coi chính trị gắn liền với hai hiện tượng: xung đột và hợp tác. Do mỗi người đều khác nhau và nguồn tài nguyên là hữu hạn, nên con người không thể tránh khỏi xung đột, và để tác động lên những điều kiện đó, con người cần phải phối hợp với người khác.',
            'Cho nên, không thể tách rời con người khỏi chính trị. Hay nói cách khác, theo Aristotle, con người là những "động vật chính trị".',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Bạn có biết?',
          text: 'Từ "chính trị" (politics) bắt nguồn từ "polis" trong tiếng Hy Lạp cổ, có nghĩa là thành bang (city-state).',
        },
        {
          type: 'text',
          title: '1. Chính trị là nghệ thuật cai trị',
          paragraphs: [
            'Đây là định nghĩa cổ điển nhất. Chính trị được hiểu là những công việc liên quan tới nhà nước — thực thi quyền lực, xây dựng chính sách lên cộng đồng và xã hội.',
            'Với cách định nghĩa này, chính trị chỉ xảy ra trong phòng nội các, văn phòng lập pháp và cơ quan nhà nước. Người dân, gia đình, làng xã hay cơ sở giáo dục đều không thể tham gia chính trị.',
          ],
        },
        {
          type: 'text',
          title: '2. Chính trị là những vấn đề công',
          paragraphs: [
            'Theo định nghĩa này, sự phân chia giữa đời sống công và đời sống tư sẽ quyết định đâu là chính trị và phi chính trị. Các thiết chế nhà nước (chính quyền, tòa án, quân đội) thuộc lĩnh vực công, còn gia đình, doanh nghiệp tư nhân thuộc khu vực tư.',
            'Phản biện quan điểm này, nhiều nhà tư tưởng cho rằng nếu chính trị chỉ xảy ra trong khu vực công thì chính trị chẳng bao giờ tồn tại trong gia đình và giữa các mối quan hệ cá nhân.',
          ],
        },
        {
          type: 'text',
          title: '3. Chính trị là thỏa hiệp và đồng thuận',
          paragraphs: [
            'Khái niệm thứ ba nhìn nhận chính trị là một quá trình thỏa hiệp, hòa giải và đàm phán để giải quyết xung đột — hoàn toàn trái ngược với việc sử dụng bạo lực.',
            'Bernard Crick tin rằng các vấn đề trong xã hội có thể được giải quyết thông qua tranh luận, đồng thuận và hòa giải. Tuy nhiên, những người phản đối cho rằng khái niệm này chỉ đúng cho các xã hội dân chủ đa nguyên ở phương Tây.',
          ],
        },
        {
          type: 'text',
          title: '4. Chính trị là quyền lực',
          paragraphs: [
            'Đây là định nghĩa rộng nhất. Theo Harold Lasswell, chính trị là sự đấu tranh giành nguồn tài nguyên khan hiếm, và quyền lực là cách con người thực hiện cuộc chiến này.',
            'Theo cách này, chính trị xảy ra ở mọi nơi — từ khu vực công đến khu vực tư, ở mọi mối quan hệ, từ gia đình cho tới giữa các quốc gia.',
          ],
        },
        {
          type: 'spectrum-placer',
          title: 'Phổ định nghĩa chính trị',
          instruction: 'Hãy đặt mỗi định nghĩa chính trị vào đúng vị trí trên phổ từ HẸP đến RỘNG.',
          spectrum: {
            leftLabel: 'Hẹp',
            rightLabel: 'Rộng',
            leftDescription: 'Chỉ trong phạm vi nhà nước',
            rightDescription: 'Ở mọi nơi trong xã hội',
          },
          items: [
            { id: 'art', label: 'Nghệ thuật cai trị', correctPosition: 15, tolerance: 15, explanation: 'Đây là định nghĩa hẹp nhất — chính trị chỉ nằm trong phòng nội các và đảng phái.' },
            { id: 'public', label: 'Những vấn đề công', correctPosition: 35, tolerance: 15, explanation: 'Rộng hơn một chút — bao gồm cả khu vực công nhưng vẫn loại trừ đời sống tư.' },
            { id: 'compromise', label: 'Thỏa hiệp & đồng thuận', correctPosition: 60, tolerance: 15, explanation: 'Rộng hơn — bao gồm mọi quá trình đàm phán trong xã hội dân chủ.' },
            { id: 'power', label: 'Quyền lực', correctPosition: 90, tolerance: 15, explanation: 'Rộng nhất — chính trị xảy ra ở mọi mối quan hệ có quyền lực.' },
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Ghi nhớ',
          text: 'Không có một định nghĩa duy nhất về chính trị. Tùy góc nhìn, chính trị có thể hẹp (chỉ trong nhà nước) hoặc rộng (ở mọi mối quan hệ quyền lực). Điều quan trọng là hiểu rằng chính trị ảnh hưởng đến mọi người.',
        },
        {
          type: 'question',
          question: 'Theo Aristotle, con người được gọi là gì?',
          options: [
            { id: 'a', text: 'Động vật xã hội', isCorrect: false },
            { id: 'b', text: 'Động vật chính trị', isCorrect: true },
            { id: 'c', text: 'Động vật kinh tế', isCorrect: false },
            { id: 'd', text: 'Động vật lý trí', isCorrect: false },
          ],
          explanation: 'Aristotle cho rằng con người là "động vật chính trị" (political animals) vì không thể tách rời con người khỏi chính trị — xung đột và hợp tác là bản chất tự nhiên.',
        },
      ],
    },
  });
  console.log(`  Lesson 1.1: ${lesson1_1.name}`);

  // --- Lesson 1.2: Chính trị là quyền lực ---
  const lesson1_2 = await prisma.lesson.create({
    data: {
      slug: 'chinh-tri-la-quyen-luc',
      name: 'Chính trị là quyền lực',
      levelId: level1.id,
      sortOrder: 1,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson1_2.id,
      title: 'Chính trị là quyền lực',
      blocks: [
        {
          type: 'text',
          title: 'Khi quyền lực là cốt lõi của chính trị',
          paragraphs: [
            'Ở phạm vi rộng nhất, chính trị bao gồm việc sản xuất, phân phối và sử dụng tài nguyên. Bản chất của chính trị là quyền lực: khả năng đáp ứng một nhu cầu, bằng bất kể phương thức.',
            'Harold Lasswell đã diễn tả quan điểm này rằng chính trị là sự đấu tranh giành nguồn tài nguyên khan hiếm, và quyền lực là cách con người thực hiện cuộc chiến này.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Ai ủng hộ quan điểm này?',
          text: 'Những người đấu tranh cho nữ quyền và những người theo chủ nghĩa Marx là hai nhóm tiêu biểu ủng hộ định nghĩa chính trị là quyền lực.',
        },
        {
          type: 'text',
          title: 'Góc nhìn nữ quyền',
          paragraphs: [
            'Trong làn sóng nữ quyền thứ hai ở thập niên 60, những người ủng hộ nữ quyền đã cố gắng mở rộng khái niệm chính trị tới những mối quan hệ cá nhân.',
            'Kate Millett định nghĩa chính trị là "những mối quan hệ được cấu trúc bởi quyền lực, sự sắp xếp khi một nhóm người bị kiểm soát bởi người khác".',
          ],
        },
        {
          type: 'text',
          title: 'Góc nhìn Marx',
          paragraphs: [
            'Marx sử dụng từ "chính trị" cho hai nghĩa khác nhau. Thứ nhất, chính trị ám chỉ bộ máy nhà nước. Ở tầng thứ hai, xã hội được cấu thành từ cơ sở (quan hệ sản xuất) và "cấu trúc thượng tầng" (chính trị, luật pháp, văn hóa).',
            'Marx phản đối quan điểm chính trị chỉ thuộc về nhà nước. Ông tin tưởng quyền lực chính trị bắt nguồn từ hệ thống giai cấp và xã hội dân sự là điểm cốt lõi của chính trị.',
          ],
        },
        {
          type: 'perspective-switch',
          title: 'Ba góc nhìn về chính trị',
          event: 'Một công nhân bị sa thải sau khi phản đối điều kiện làm việc tại nhà máy.',
          perspectives: [
            { id: 'aristotle', role: 'Aristotle', icon: 'landmark', narrative: 'Đây là hành vi chính trị tự nhiên — con người là động vật chính trị, và việc phản đối là một phần của đời sống cộng đồng. Tuy nhiên, nó cần được giải quyết trong khuôn khổ polis (thành bang).' },
            { id: 'marx', role: 'Karl Marx', icon: 'factory', narrative: 'Đây là biểu hiện rõ ràng của đấu tranh giai cấp! Chủ nhà máy (giai cấp tư sản) dùng quyền lực kinh tế để đàn áp công nhân (giai cấp vô sản). Chính trị không chỉ ở nhà nước mà ngay tại nơi làm việc.' },
            { id: 'millett', role: 'Kate Millett', icon: 'megaphone', narrative: 'Mối quan hệ ông chủ - công nhân là mối quan hệ quyền lực. Cá nhân bị sa thải vì dám lên tiếng — chính trị xảy ra ngay trong đời sống cá nhân, không chỉ ở nghị trường.' },
          ],
          question: {
            text: 'Điểm chung của cả ba góc nhìn trên là gì?',
            options: [
              { id: 'a', text: 'Chính trị chỉ xảy ra trong nhà nước', isCorrect: false },
              { id: 'b', text: 'Quyền lực hiện diện trong mọi mối quan hệ xã hội', isCorrect: true },
              { id: 'c', text: 'Bạo lực là cách duy nhất giải quyết xung đột', isCorrect: false },
              { id: 'd', text: 'Người lao động luôn đúng', isCorrect: false },
            ],
            explanation: 'Dù từ góc nhìn khác nhau, cả Aristotle, Marx và Millett đều thừa nhận rằng quyền lực và chính trị hiện diện trong mọi tầng lớp xã hội, không chỉ giới hạn trong bộ máy nhà nước.',
          },
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Ghi nhớ',
          text: 'Chính trị theo nghĩa rộng nhất là về quyền lực — ai có quyền, dùng quyền ra sao, và ai bị ảnh hưởng. Góc nhìn này giúp chúng ta thấy chính trị không chỉ ở nghị trường mà ngay trong đời sống hàng ngày.',
        },
        {
          type: 'question',
          question: 'Kate Millett định nghĩa chính trị là gì?',
          options: [
            { id: 'a', text: 'Nghệ thuật cai trị thông qua bầu cử', isCorrect: false },
            { id: 'b', text: 'Những mối quan hệ được cấu trúc bởi quyền lực', isCorrect: true },
            { id: 'c', text: 'Quá trình đàm phán giữa các đảng phái', isCorrect: false },
            { id: 'd', text: 'Hoạt động của bộ máy nhà nước', isCorrect: false },
          ],
          explanation: 'Kate Millett mở rộng khái niệm chính trị đến mọi mối quan hệ có cấu trúc quyền lực — kể cả trong gia đình, nơi làm việc, không chỉ trong nhà nước.',
        },
      ],
    },
  });
  console.log(`  Lesson 1.2: ${lesson1_2.name}`);

  // --- Lesson 1.3: Các học thuyết chính trị ---
  const lesson1_3 = await prisma.lesson.create({
    data: {
      slug: 'hoc-thuyet-chinh-tri',
      name: 'Các học thuyết chính trị',
      levelId: level1.id,
      sortOrder: 2,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson1_3.id,
      title: 'Các học thuyết chính trị',
      blocks: [
        {
          type: 'text',
          title: 'Từ triết học đến nền tảng nhà nước hiện đại',
          paragraphs: [
            'Các học thuyết chính trị là hệ thống tư tưởng giải thích cách tổ chức xã hội, mối quan hệ giữa nhà nước và người dân, và nguồn gốc quyền lực. Hai trong số những học thuyết có ảnh hưởng lớn nhất đến thế giới hiện đại là của Jean-Jacques Rousseau và John Locke.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Bối cảnh lịch sử',
          text: 'Cả Rousseau và Locke đều sống trong thời kỳ Khai Minh (Enlightenment) — giai đoạn mà lý trí được đề cao và các nhà tư tưởng bắt đầu đặt câu hỏi về quyền lực tuyệt đối của vua chúa.',
        },
        {
          type: 'text',
          title: 'Jean-Jacques Rousseau (1712–1778)',
          paragraphs: [
            'Rousseau tin rằng con người vốn tự do và bình đẳng trong trạng thái tự nhiên, nhưng xã hội đã tạo ra bất bình đẳng. Trong tác phẩm "Khế ước xã hội" (Du Contrat Social, 1762), ông đề xuất rằng quyền lực chính danh chỉ có thể đến từ sự đồng thuận của người dân.',
            'Ý tưởng về "ý chí chung" (volonté générale) của Rousseau — rằng nhà nước phải phục vụ lợi ích chung của toàn dân, không phải lợi ích riêng — đã trở thành nền tảng tư tưởng cho Cách mạng Pháp 1789.',
          ],
        },
        {
          type: 'text',
          title: 'John Locke (1632–1704)',
          paragraphs: [
            'Locke được coi là "cha đẻ của chủ nghĩa tự do". Ông cho rằng mọi người sinh ra đều có các quyền tự nhiên không thể bị tước đoạt: quyền sống, quyền tự do, và quyền sở hữu tài sản.',
            'Theo Locke, nhà nước tồn tại để bảo vệ các quyền tự nhiên này. Nếu nhà nước vi phạm quyền của người dân, người dân có quyền lật đổ nhà nước đó. Tư tưởng này đã ảnh hưởng trực tiếp đến Tuyên ngôn Độc lập Mỹ 1776.',
          ],
        },
        {
          type: 'library-document',
          mode: 'inline',
          title: 'So sánh Rousseau và Locke',
          description: 'Bảng tóm tắt hai học thuyết chính trị quan trọng',
          category: 'Học thuyết chính trị',
          estimatedReadTime: '3 phút',
          documentContent: {
            sections: [
              {
                heading: 'Rousseau — Khế ước xã hội',
                paragraphs: [
                  'Tác phẩm: Du Contrat Social (1762)',
                  'Ý tưởng cốt lõi: Quyền lực chính danh đến từ sự đồng thuận của nhân dân. Nhà nước phải phục vụ "ý chí chung" (volonté générale).',
                  'Con người tự nhiên: Tự do, bình đẳng, nhưng bị xã hội làm hư hỏng.',
                  'Ảnh hưởng: Cách mạng Pháp 1789, tư tưởng dân chủ trực tiếp.',
                ],
              },
              {
                heading: 'Locke — Quyền tự nhiên',
                paragraphs: [
                  'Tác phẩm: Two Treatises of Government (1689)',
                  'Ý tưởng cốt lõi: Con người có quyền tự nhiên (sống, tự do, sở hữu tài sản). Nhà nước tồn tại để bảo vệ các quyền này.',
                  'Con người tự nhiên: Có lý trí, bình đẳng, sở hữu quyền không thể bị tước đoạt.',
                  'Ảnh hưởng: Tuyên ngôn Độc lập Mỹ 1776, chủ nghĩa tự do hiện đại.',
                ],
              },
            ],
            relatedConcepts: ['Khế ước xã hội', 'Quyền tự nhiên', 'Chủ nghĩa tự do', 'Ý chí chung'],
          },
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Lưu ý quan trọng',
          text: 'Cả Rousseau và Locke đều cho rằng quyền lực nhà nước phải đến từ sự đồng ý của người dân. Đây là nền tảng của tư tưởng dân chủ hiện đại — khác biệt hoàn toàn với quan niệm quyền lực đến từ thần thánh hay dòng dõi.',
        },
        {
          type: 'question',
          question: 'Tuyên ngôn Độc lập Mỹ 1776 chịu ảnh hưởng trực tiếp từ tư tưởng của ai?',
          options: [
            { id: 'a', text: 'Karl Marx', isCorrect: false },
            { id: 'b', text: 'Jean-Jacques Rousseau', isCorrect: false },
            { id: 'c', text: 'John Locke', isCorrect: true },
            { id: 'd', text: 'Aristotle', isCorrect: false },
          ],
          explanation: 'Tư tưởng của John Locke về quyền tự nhiên (quyền sống, tự do, sở hữu) và quyền lật đổ chính quyền bất chính đã ảnh hưởng trực tiếp đến Tuyên ngôn Độc lập Mỹ 1776 của Thomas Jefferson.',
        },
        {
          type: 'text',
          paragraphs: [
            'Ở bài tiếp theo, chúng ta sẽ tìm hiểu về nhà nước — thiết chế chính trị quan trọng nhất trong xã hội hiện đại. Nhà nước là gì? Nó khác gì so với chính phủ và chế độ? Hãy cùng khám phá.',
          ],
        },
      ],
    },
  });
  console.log(`  Lesson 1.3: ${lesson1_3.name}`);
  console.log(`Level 1 complete: 3 lessons\n`);

  // ============================================================
  // LEVEL 2: Nhà nước hiện đại
  // ============================================================
  const level2 = await prisma.level.create({
    data: {
      name: 'Nhà nước hiện đại',
      courseId: course.id,
      sortOrder: 1,
    },
  });
  console.log(`Level 2 created: ${level2.name}`);

  // --- Lesson 2.1: Định nghĩa nhà nước ---
  const lesson2_1 = await prisma.lesson.create({
    data: {
      slug: 'dinh-nghia-nha-nuoc',
      name: 'Định nghĩa nhà nước',
      levelId: level2.id,
      sortOrder: 0,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson2_1.id,
      title: 'Định nghĩa nhà nước',
      blocks: [
        {
          type: 'text',
          title: 'Nhà nước — Nghĩa hẹp và nghĩa rộng',
          paragraphs: [
            'Có hai cách hiểu về nhà nước mà chúng ta vẫn hay sử dụng.',
            'Theo nghĩa hẹp, nhà nước là tập hợp các thiết chế có chức năng thực thi các quyết định chung của cả cộng đồng, như hành pháp, lập pháp, tư pháp, bộ máy hành chính, quân đội, công an.',
            'Theo nghĩa rộng, nhà nước không chỉ bao gồm các thiết chế trên mà còn cả người dân, lãnh thổ, và chủ quyền trong phạm vi lãnh thổ đó.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Khi nào dùng nghĩa nào?',
          text: 'Trong đời thường, khi so sánh nhà nước với nhà thờ hoặc đoàn hội, ta dùng nghĩa hẹp. Trong khoa học chính trị, khi nói về quan hệ quốc tế giữa các quốc gia, ta dùng nghĩa rộng.',
        },
        {
          type: 'text',
          title: 'Bốn đặc điểm của nhà nước hiện đại',
          paragraphs: [
            'Dù có nhiều cách hiểu, các nhà nước hiện đại đều chia sẻ bốn đặc điểm chung:',
            '1. Lãnh thổ — một khu vực với biên giới được xác định rõ ràng. Từ Nga (17 triệu km²) đến Singapore (chưa đến 1.000 km²), mỗi nhà nước đều có lãnh thổ riêng.',
            '2. Chủ quyền — nhà nước có thẩm quyền tối cao đối với người dân và lãnh thổ. Chủ quyền bên trong (ban hành luật, chống tội phạm) và bên ngoài (được quốc tế thừa nhận).',
            '3. Tính chính danh — quyền cai trị được thừa nhận bởi người dân. Weber phân biệt ba loại: truyền thống, tài năng cá nhân, và pháp lý-duy lý.',
            '4. Bộ máy hành chính — hệ thống quan chức được bổ nhiệm, thực thi luật pháp và cung cấp dịch vụ công.',
          ],
        },
        {
          type: 'fact-or-opinion',
          title: 'Sự thật hay Quan điểm?',
          instruction: 'Phân loại mỗi nhận định sau: đó là SỰ THẬT (fact), QUAN ĐIỂM (opinion), hay NHẬN ĐỊNH SAI LỆCH (misleading)?',
          statements: [
            { id: 's1', text: 'Mọi nhà nước hiện đại đều cần có lãnh thổ với biên giới xác định.', correctAnswer: 'fact', explanation: 'Đây là sự thật — lãnh thổ là một trong bốn đặc điểm cơ bản của nhà nước hiện đại.' },
            { id: 's2', text: 'Nhà nước nào có quân đội mạnh nhất thì tự nhiên có chính danh nhất.', correctAnswer: 'misleading', explanation: 'Sai lệch — tính chính danh không đến từ sức mạnh quân sự mà từ sự chấp nhận của người dân. Sử dụng đơn thuần bạo lực rất tốn kém và không hiệu quả.' },
            { id: 's3', text: 'Chủ quyền bên ngoài có nghĩa là được các nhà nước khác thừa nhận.', correctAnswer: 'fact', explanation: 'Đúng — chủ quyền bên ngoài thể hiện ở việc nhà nước được quốc tế thừa nhận và có địa vị pháp lý bình đẳng.' },
            { id: 's4', text: 'Bộ máy hành chính là đặc điểm quan trọng nhất trong bốn đặc điểm.', correctAnswer: 'opinion', explanation: 'Đây là quan điểm — mỗi đặc điểm đều quan trọng và không có cơ sở khoa học để xếp hạng chúng.' },
            { id: 's5', text: 'Nga đã sáp nhập bán đảo Crimea vào năm 2014, thay đổi biên giới với Ukraine.', correctAnswer: 'fact', explanation: 'Đây là sự thật lịch sử — việc sáp nhập Crimea là ví dụ cho thấy lãnh thổ nhà nước không cố định.' },
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Ghi nhớ',
          text: 'Nhà nước hiện đại cần bốn yếu tố: lãnh thổ, chủ quyền, tính chính danh, và bộ máy hành chính. Thiếu bất kỳ yếu tố nào, nhà nước sẽ yếu hoặc không ổn định.',
        },
        {
          type: 'question',
          question: 'Theo Weber, có bao nhiêu loại tính chính danh?',
          options: [
            { id: 'a', text: '2 loại: truyền thống và pháp lý', isCorrect: false },
            { id: 'b', text: '3 loại: truyền thống, tài năng cá nhân, pháp lý-duy lý', isCorrect: true },
            { id: 'c', text: '4 loại: truyền thống, tôn giáo, quân sự, dân chủ', isCorrect: false },
            { id: 'd', text: '1 loại: bầu cử dân chủ', isCorrect: false },
          ],
          explanation: 'Weber phân biệt 3 loại: truyền thống (cha truyền con nối), tài năng cá nhân (charisma của lãnh đạo), và pháp lý-duy lý (bầu cử theo luật). Tính chính danh mạnh nhất khi kết hợp cả ba.',
        },
      ],
    },
  });
  console.log(`  Lesson 2.1: ${lesson2_1.name}`);

  // --- Lesson 2.2: Đặc điểm nhà nước hiện đại ---
  const lesson2_2 = await prisma.lesson.create({
    data: {
      slug: 'dac-diem-nha-nuoc-hien-dai',
      name: 'Đặc điểm nhà nước hiện đại',
      levelId: level2.id,
      sortOrder: 1,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson2_2.id,
      title: 'Đặc điểm nhà nước hiện đại',
      blocks: [
        {
          type: 'text',
          title: 'Tính chính danh — Tại sao người dân nghe lời nhà nước?',
          paragraphs: [
            'Trong bốn đặc điểm của nhà nước hiện đại, tính chính danh là yếu tố phức tạp và thú vị nhất. Tính chính danh có hai mặt: nhà nước tuyên bố rằng nó có quyền cai trị, và người dân chấp nhận yêu sách đó.',
            'Nhà nước sở hữu sức mạnh cưỡng chế lớn qua quân đội và cảnh sát, nhưng sử dụng đơn thuần bạo lực rất tốn kém và không hiệu quả. Tính chính danh giúp củng cố chủ quyền với chi phí thấp hơn nhiều.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Lưu ý',
          text: '"Nếu người dân tuân theo chính quyền bởi vì họ tin rằng nó có quyền cai trị, thì không cần phải dùng bạo lực để duy trì trật tự." — Vì vậy, chính quyền luôn cố khẳng định tính chính danh, kể cả thông qua tuyên truyền.',
        },
        {
          type: 'socratic-dialog',
          title: 'Khám phá tính chính danh',
          concept: 'Tính chính danh của nhà nước',
          introduction: 'Hãy cùng khám phá khái niệm "tính chính danh" qua một chuỗi câu hỏi dẫn dắt.',
          steps: [
            {
              question: 'Tại sao hầu hết mọi người tuân theo luật pháp trong đời thường?',
              options: [
                { id: 'a1', text: 'Vì sợ bị phạt hoặc bỏ tù', followUp: 'Đúng là sợ hãi có vai trò, nhưng nếu chỉ dựa vào sợ hãi, nhà nước cần bao nhiêu cảnh sát để theo dõi mọi người? Có lẽ có lý do sâu hơn...', isDeepening: false },
                { id: 'a2', text: 'Vì tin rằng nhà nước có quyền đặt ra luật', followUp: 'Chính xác! Đây chính là "tính chính danh" — khi người dân tin rằng nhà nước có quyền cai trị, họ tự nguyện tuân theo mà không cần bị ép buộc.', isDeepening: true },
              ],
            },
            {
              question: 'Vậy tính chính danh có thể đến từ đâu?',
              options: [
                { id: 'b1', text: 'Từ truyền thống lâu đời (vua cha truyền con nối)', followUp: 'Đúng! Weber gọi đây là "tính chính danh truyền thống". Các triều đại ở Đông Á cai trị dựa trên ý tưởng thiên mệnh trong hàng ngàn năm.', isDeepening: true },
                { id: 'b2', text: 'Từ bầu cử và luật pháp', followUp: 'Đúng! Weber gọi đây là "tính chính danh pháp lý-duy lý" — quyền cai trị đến từ các quy trình pháp luật đã được thống nhất trước.', isDeepening: true },
              ],
            },
            {
              question: 'Weber nói tính chính danh mạnh nhất khi kết hợp cả ba loại. Bạn nghĩ tại sao?',
              options: [
                { id: 'c1', text: 'Vì mỗi loại thuyết phục một nhóm người khác nhau', followUp: 'Chính xác! Một lãnh đạo được bầu cử (pháp lý), có uy tín cá nhân (charisma), và đến từ dòng dõi có truyền thống sẽ được ủng hộ rộng rãi nhất.', isDeepening: true },
                { id: 'c2', text: 'Vì nếu chỉ có một loại thì quá yếu', followUp: 'Cũng đúng một phần. Một nhà lãnh đạo chỉ dựa vào charisma có thể mất tính chính danh khi hết hào quang. Kết hợp nhiều nguồn giúp quyền lực bền vững hơn.', isDeepening: false },
              ],
            },
          ],
          revelation: 'Tính chính danh là "vũ khí mềm" mạnh nhất của nhà nước. Nó biến sự cai trị từ ép buộc thành tự nguyện. Khi tính chính danh suy giảm — dù do tham nhũng, bất công, hay mất lòng dân — nhà nước phải dùng nhiều bạo lực hơn, và đó thường là dấu hiệu của sự sụp đổ.',
        },
        {
          type: 'text',
          title: 'Bộ máy hành chính — Cánh tay nối dài của nhà nước',
          paragraphs: [
            'Đặc điểm quan trọng cuối cùng là bộ máy hành chính (quan liêu), bao gồm các quan chức được bổ nhiệm có chức năng thực thi luật.',
            'Nhà nước thực hiện nhiều chức năng: quản lý hành chính, thu thuế, cung cấp dịch vụ công — tất cả đều cần bộ máy hành chính. Một bộ máy hiệu quả mang đến cho nhà nước sức mạnh lớn hơn, giống như tính chính danh, nó giúp tăng cường chủ quyền.',
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Ghi nhớ',
          text: 'Tính chính danh và bộ máy hành chính là hai "phần mềm" giúp nhà nước vận hành mà không cần dùng đến bạo lực. Nhà nước mạnh không chỉ có quân đội mạnh mà còn có tính chính danh cao và bộ máy hành chính hiệu quả.',
        },
        {
          type: 'question',
          question: 'Tại sao tính chính danh giúp nhà nước cai trị hiệu quả hơn bạo lực?',
          options: [
            { id: 'a', text: 'Vì bạo lực tốn kém và không bền vững', isCorrect: true },
            { id: 'b', text: 'Vì người dân thích được tuyên truyền', isCorrect: false },
            { id: 'c', text: 'Vì quân đội luôn yếu hơn cảnh sát', isCorrect: false },
            { id: 'd', text: 'Vì nhà nước không có khả năng dùng bạo lực', isCorrect: false },
          ],
          explanation: 'Khi người dân tin rằng nhà nước có quyền cai trị, họ tự nguyện tuân theo — không cần bạo lực. Dùng bạo lực rất tốn kém, không hiệu quả, và thường là dấu hiệu nhà nước đang mất tính chính danh.',
        },
      ],
    },
  });
  console.log(`  Lesson 2.2: ${lesson2_2.name}`);

  // --- Lesson 2.3: Phân biệt nhà nước, chính phủ, chế độ ---
  const lesson2_3 = await prisma.lesson.create({
    data: {
      slug: 'phan-biet-nha-nuoc-chinh-phu-che-do',
      name: 'Phân biệt nhà nước, chính phủ, chế độ và ý thức hệ',
      levelId: level2.id,
      sortOrder: 2,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson2_3.id,
      title: 'Phân biệt nhà nước, chính phủ, chế độ và ý thức hệ',
      blocks: [
        {
          type: 'text',
          title: 'Bốn khái niệm thường bị nhầm lẫn',
          paragraphs: [
            'Trong đời thường, chúng ta hay dùng lẫn lộn các từ "nhà nước", "chính phủ", "chế độ". Nhưng trong khoa học chính trị, chúng có ý nghĩa rất khác nhau.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Bốn khái niệm cần phân biệt',
          text: 'A. Chính phủ (government) — nhóm người nắm giữ thiết chế nhà nước. B. Chế độ (regime) — cách thức tổ chức quyền lực nhà nước. C. Ý thức hệ (ideology) — tập hợp giá trị, niềm tin mà nhà nước theo đuổi. D. Nhà nước (state) — tổng thể bao gồm thiết chế, lãnh thổ, dân cư, chủ quyền.',
        },
        {
          type: 'text',
          paragraphs: [
            'Ví dụ: Chính phủ có thể thay đổi (từ Obama sang Trump), nhưng nhà nước Mỹ vẫn là nhà nước Mỹ. Chế độ có thể chuyển đổi (từ quân chủ sang cộng hòa), nhưng nhà nước Pháp vẫn tồn tại.',
          ],
        },
        {
          type: 'redacted-document',
          title: 'Điền vào chỗ trống',
          instruction: 'Dựa vào kiến thức vừa học, hãy điền từ đúng vào mỗi chỗ trống trong đoạn văn về hệ thống chính trị Việt Nam.',
          documentTitle: 'Hệ thống chính trị Việt Nam hiện nay',
          content: 'Ở Việt Nam hiện nay, người đứng đầu [REDACTED:r1] là chủ tịch Lương Cường. Người đứng đầu [REDACTED:r2] là thủ tướng Phạm Minh Chính. Việt Nam thuộc [REDACTED:r3] độc đảng, theo [REDACTED:r4] Cộng sản, với người đứng đầu Đảng Cộng sản là Tổng bí thư Tô Lâm.',
          redactions: [
            { id: 'r1', answer: 'nhà nước', hint: 'Tổng thể bao gồm thiết chế, lãnh thổ, dân cư', alternatives: ['Nhà nước'] },
            { id: 'r2', answer: 'chính phủ', hint: 'Nhóm người nắm giữ thiết chế nhà nước', alternatives: ['Chính phủ'] },
            { id: 'r3', answer: 'chế độ', hint: 'Cách thức tổ chức quyền lực', alternatives: ['Chế độ'] },
            { id: 'r4', answer: 'ý thức hệ', hint: 'Tập hợp giá trị, niềm tin', alternatives: ['Ý thức hệ'] },
          ],
          context: 'Việt Nam là một nhà nước với chế độ độc đảng, theo ý thức hệ Cộng sản. Chính phủ do thủ tướng đứng đầu, còn nhà nước do chủ tịch nước đứng đầu.',
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Ghi nhớ',
          text: 'Nhà nước > Chế độ > Chính phủ. Nhà nước tồn tại lâu dài nhất, chế độ có thể thay đổi (dân chủ ↔ độc tài), và chính phủ thay đổi thường xuyên nhất (qua bầu cử hoặc chính biến).',
        },
        {
          type: 'question',
          question: 'Khi nói "chính phủ Trump" hay "chính phủ Obama", từ "chính phủ" ở đây có nghĩa gì?',
          options: [
            { id: 'a', text: 'Nhà nước Mỹ', isCorrect: false },
            { id: 'b', text: 'Nhóm người đang nắm quyền điều hành', isCorrect: true },
            { id: 'c', text: 'Chế độ chính trị của Mỹ', isCorrect: false },
            { id: 'd', text: 'Ý thức hệ của Mỹ', isCorrect: false },
          ],
          explanation: 'Chính phủ (government) là nhóm người nắm giữ thiết chế nhà nước tại một thời điểm cụ thể. Trump và Obama là hai chính phủ khác nhau, nhưng nhà nước Mỹ và chế độ cộng hòa không thay đổi.',
        },
      ],
    },
  });
  console.log(`  Lesson 2.3: ${lesson2_3.name}`);
  console.log(`Level 2 complete: 3 lessons\n`);

  // ============================================================
  // LEVEL 3: Nhà nước và các thể chế
  // ============================================================
  const level3 = await prisma.level.create({
    data: {
      name: 'Nhà nước và các thể chế',
      courseId: course.id,
      sortOrder: 2,
    },
  });
  console.log(`Level 3 created: ${level3.name}`);

  // --- Lesson 3.1: Sự hình thành nhà nước hiện đại ---
  const lesson3_1 = await prisma.lesson.create({
    data: {
      slug: 'su-hinh-thanh-nha-nuoc-hien-dai',
      name: 'Sự hình thành nhà nước hiện đại',
      levelId: level3.id,
      sortOrder: 0,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson3_1.id,
      title: 'Sự hình thành nhà nước hiện đại',
      blocks: [
        {
          type: 'text',
          title: 'Từ phong kiến đến nhà nước hiện đại',
          paragraphs: [
            'Các nhà nước hiện đại được hình thành lần đầu tiên ở châu Âu vào khoảng thế kỷ 15 đến thế kỷ 18. Sau đó, mô hình này được lan rộng ra thông qua quá trình thực dân hóa.',
            'Quá trình này trải qua ba giai đoạn chính: nhà nước phong kiến, chế độ chuyên chế, và nhà nước hiện đại.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Nhà nước phong kiến',
          text: 'Trước năm 1500, châu Âu bao gồm các nhà nước phong kiến không tuyên bố chủ quyền rõ ràng. Có nhiều chủ quyền chồng lấp, lòng trung thành giữa chư hầu và lãnh chúa thường xuyên thay đổi.',
        },
        {
          type: 'text',
          title: 'Chế độ chuyên chế (thế kỷ 15)',
          paragraphs: [
            'Các lãnh chúa lớn với ưu thế kinh tế và quân sự dần đánh bại các lãnh chúa địa phương, khẳng định quyền lực tuyệt đối. Đây là giai đoạn phôi thai của nhà nước hiện đại với quân đội thường trực, ngoại giao chuyên nghiệp, bộ máy hành chính tập trung.',
            'Như Louis XIV của Pháp từng tuyên bố: "Ta là nhà nước" — nhà nước chưa được tách biệt khỏi người cai trị.',
          ],
        },
        {
          type: 'text',
          title: 'Nhà nước hiện đại (sau 1648)',
          paragraphs: [
            'Hòa ước Westphalia 1648 chính thức hóa ý tưởng về nhà nước như các thực thể bình đẳng về pháp lý. Các cuộc cách mạng sau đó — Cách mạng Anh 1688, Cách mạng Mỹ 1776, Cách mạng Pháp 1789 — đã củng cố sự tách biệt giữa nhà nước và người cai trị.',
            'Người dân chuyển từ "thần dân" (của vua) sang "công dân" (của nhà nước). Thế giới ngày nay là thế giới của các nhà nước — dân tộc.',
          ],
        },
        {
          type: 'timeline-sorter',
          title: 'Sắp xếp theo trình tự thời gian',
          instruction: 'Hãy sắp xếp các sự kiện quan trọng trong quá trình hình thành nhà nước hiện đại theo đúng thứ tự thời gian.',
          events: [
            { id: 'feudal', title: 'Chế độ phong kiến châu Âu', date: 'Trước 1500', year: 1400, description: 'Nhiều chủ quyền chồng lấp, lòng trung thành là trung tâm.' },
            { id: 'absolutism', title: 'Chế độ chuyên chế hình thành', date: 'Thế kỷ 15', year: 1450, description: 'Vua tuyên bố chủ quyền tuyệt đối, Louis XIV: "Ta là nhà nước".' },
            { id: 'westphalia', title: 'Hòa ước Westphalia', date: '1648', year: 1648, description: 'Chính thức hóa nhà nước có chủ quyền bình đẳng.' },
            { id: 'glorious', title: 'Cách mạng Vinh Quang Anh', date: '1688', year: 1688, description: 'Thiết lập chế độ quân chủ lập hiến.' },
            { id: 'us', title: 'Cách mạng Mỹ', date: '1776', year: 1776, description: 'Thiết lập nền cộng hòa Mỹ.' },
            { id: 'france', title: 'Cách mạng Pháp', date: '1789', year: 1789, description: 'Thiết lập nền cộng hòa dân chủ ở Pháp.' },
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Ghi nhớ',
          text: 'Nhà nước hiện đại hình thành qua quá trình dài từ phong kiến → chuyên chế → hiện đại. Hòa ước Westphalia 1648 là cột mốc quan trọng nhất, đặt nền tảng cho hệ thống quốc tế ngày nay.',
        },
        {
          type: 'question',
          question: 'Hòa ước Westphalia 1648 có ý nghĩa gì trong lịch sử hình thành nhà nước?',
          options: [
            { id: 'a', text: 'Lần đầu tiên thiết lập chế độ dân chủ', isCorrect: false },
            { id: 'b', text: 'Chính thức hóa ý tưởng nhà nước có chủ quyền bình đẳng', isCorrect: true },
            { id: 'c', text: 'Xóa bỏ hoàn toàn chế độ phong kiến', isCorrect: false },
            { id: 'd', text: 'Trao quyền cho người dân lật đổ vua', isCorrect: false },
          ],
          explanation: 'Hòa ước Westphalia chính thức hóa ý tưởng về nhà nước như các thực thể bình đẳng về pháp lý, có chủ quyền đối nội và đối ngoại — nền tảng của hệ thống quốc tế hiện đại.',
        },
      ],
    },
  });
  console.log(`  Lesson 3.1: ${lesson3_1.name}`);

  // --- Lesson 3.2: Các chế độ chính trị ---
  const lesson3_2 = await prisma.lesson.create({
    data: {
      slug: 'cac-che-do-chinh-tri',
      name: 'Các chế độ chính trị',
      levelId: level3.id,
      sortOrder: 1,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson3_2.id,
      title: 'Các chế độ chính trị',
      blocks: [
        {
          type: 'text',
          title: 'Phân loại chế độ chính trị',
          paragraphs: [
            'Chế độ chính trị là tổng thể bao gồm các nguyên tắc luật pháp, hệ thống đảng phái, hệ tư tưởng. Nó thể hiện cách tổ chức quyền lực trong một nhà nước.',
            'Từ thời Hy Lạp cổ đại, con người đã cố gắng phân loại các chế độ chính trị.',
          ],
        },
        {
          type: 'text',
          title: 'Phân loại theo Aristotle',
          paragraphs: [
            'Aristotle nghiên cứu hiến pháp của 150 thành bang và xây dựng ba kiểu chế độ:',
            '• Quân chủ — một người đứng đầu, hành động vì lợi ích chung. Có thể thoái hóa thành bạo chúa.',
            '• Quý tộc — nhóm người ưu tú điều hành. Có thể thoái hóa thành đầu sỏ độc tài.',
            '• Dân chủ — nhiều nhóm lãnh đạo luân phiên qua bốc thăm và bầu cử. Platon và Aristotle lo ngại chế độ này vì nhiều người thiếu hiểu biết vẫn có cơ hội điều hành.',
          ],
        },
        {
          type: 'text',
          title: 'Phân loại theo Montesquieu',
          paragraphs: [
            'Trong tác phẩm "Tinh thần pháp luật" (1748), Montesquieu xây dựng ba kiểu:',
            '• Quân chủ — lãnh đạo bằng danh dự.',
            '• Cộng hòa — chính quyền đại diện dựa trên đạo đức.',
            '• Chuyên chế áp bức — gieo rắc sợ hãi để giữ ổn định.',
            'Montesquieu tiến xa hơn Aristotle bằng cách phân tích dựa trên thuộc tính vốn có của mỗi thể chế.',
          ],
        },
        {
          type: 'spectrum-placer',
          title: 'Phổ chế độ chính trị',
          instruction: 'Hãy đặt mỗi chế độ chính trị vào đúng vị trí trên phổ từ TẬP QUYỀN đến PHÂN QUYỀN.',
          spectrum: {
            leftLabel: 'Tập quyền',
            rightLabel: 'Phân quyền',
            leftDescription: 'Quyền lực tập trung vào một người/nhóm',
            rightDescription: 'Quyền lực được phân chia và kiểm soát',
          },
          items: [
            { id: 'autocracy', label: 'Chuyên chế áp bức', correctPosition: 5, tolerance: 10, explanation: 'Quyền lực tập trung tuyệt đối, cai trị bằng sợ hãi — cực tập quyền.' },
            { id: 'monarchy', label: 'Quân chủ tuyệt đối', correctPosition: 20, tolerance: 15, explanation: 'Vua nắm quyền tối cao nhưng có thể bị giới hạn bởi truyền thống.' },
            { id: 'one-party', label: 'Độc đảng', correctPosition: 30, tolerance: 15, explanation: 'Một đảng kiểm soát nhà nước, không có cạnh tranh chính trị thực sự.' },
            { id: 'constitutional', label: 'Quân chủ lập hiến', correctPosition: 65, tolerance: 15, explanation: 'Vua còn nhưng quyền lực bị giới hạn bởi hiến pháp và nghị viện.' },
            { id: 'presidential', label: 'Cộng hòa tổng thống', correctPosition: 80, tolerance: 15, explanation: 'Tam quyền phân lập rõ ràng, tổng thống và quốc hội độc lập.' },
            { id: 'parliamentary', label: 'Cộng hòa nghị viện', correctPosition: 85, tolerance: 15, explanation: 'Quyền lực phân chia, nghị viện có vai trò trung tâm.' },
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Lưu ý',
          text: 'Khi chỉ có một đảng được phép điều hành đất nước mà không có cạnh tranh chính trị, sẽ không có dân chủ — cho dù quốc hiệu luôn đi kèm với từ "dân chủ". Ví dụ: Cộng hòa Dân chủ Nhân dân Triều Tiên.',
        },
        {
          type: 'question',
          question: 'Theo Aristotle, chế độ quân chủ có thể thoái hóa thành chế độ gì?',
          options: [
            { id: 'a', text: 'Chế độ đầu sỏ', isCorrect: false },
            { id: 'b', text: 'Chế độ bạo chúa', isCorrect: true },
            { id: 'c', text: 'Chế độ dân chủ', isCorrect: false },
            { id: 'd', text: 'Chế độ cộng hòa', isCorrect: false },
          ],
          explanation: 'Aristotle cho rằng khi vua không thực hiện tốt bổn phận vì lợi ích chung, quân chủ sẽ thoái hóa thành bạo chúa (tyranny). Tương tự, quý tộc → đầu sỏ, dân chủ → dân đen lãnh đạo.',
        },
      ],
    },
  });
  console.log(`  Lesson 3.2: ${lesson3_2.name}`);

  // --- Lesson 3.3: Cân bằng và kiểm soát quyền lực ---
  const lesson3_3 = await prisma.lesson.create({
    data: {
      slug: 'can-bang-kiem-soat-quyen-luc',
      name: 'Cân bằng và kiểm soát quyền lực',
      levelId: level3.id,
      sortOrder: 2,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson3_3.id,
      title: 'Cân bằng và kiểm soát quyền lực',
      blocks: [
        {
          type: 'text',
          title: 'Tại sao cần kiểm soát quyền lực?',
          paragraphs: [
            'Nhà nước là thiết chế có quyền lực cao nhất trong xã hội hiện đại, và luôn có xu hướng gia tăng, củng cố, và lạm dụng quyền lực nếu không có cơ chế kiểm soát.',
            'Montesquieu cảnh báo: "Nếu cơ quan cầm quyền vừa là kẻ thi hành luật vừa tự mình là kẻ lập pháp, thì họ có thể tàn phá quốc gia bằng những ý chí sai lầm. Nếu họ còn nắm luôn cả quyền xét xử nữa thì họ có thể đè nát mỗi công dân theo ý muốn của mình."',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Bốn cơ chế kiểm soát quyền lực',
          text: 'Hiến pháp, Tam quyền phân lập, Đảng phái chính trị, và Xã hội dân sự — là bốn cơ chế cần thiết để ngăn chặn nhà nước lạm dụng quyền lực.',
        },
        {
          type: 'text',
          title: 'Hiến pháp',
          paragraphs: [
            'Hiến pháp là đạo luật cơ bản và có hiệu lực pháp lý cao nhất. Trong các thể chế dân chủ tự do, hiến pháp trở thành tấm khiên bảo vệ quyền và tự do cá nhân.',
            'Ba yếu tố quyết định hiến pháp có hiệu quả hay không: (1) điều kiện văn hóa-xã hội ủng hộ, (2) giới cầm quyền tuân thủ, (3) đủ linh hoạt để thích ứng với tình hình mới.',
            'Kể cả những thể chế độc tài cũng áp dụng hiến pháp — điều đó cho thấy hiến pháp là cần thiết nhưng không đủ để đảm bảo tự do dân chủ.',
          ],
        },
        {
          type: 'text',
          title: 'Tam quyền phân lập',
          paragraphs: [
            'Lord Acton viết: "Quyền lực làm con người tha hóa, quyền lực tuyệt đối dẫn tới tha hóa tuyệt đối."',
            'Nguyên tắc tam quyền phân lập chia quyền lực thành ba nhánh: lập pháp (xây dựng luật), hành pháp (thi hành luật), tư pháp (diễn giải luật). Nhân sự mỗi nhánh phải độc lập.',
            'Tam quyền phân lập không phải tách rời hoàn toàn, mà là để các nhánh tác động lẫn nhau tạo hệ thống "kiểm soát và đối trọng" (checks and balances).',
          ],
        },
        {
          type: 'debate-arena',
          title: 'Tranh luận: Tam quyền phân lập ở Việt Nam',
          topic: 'Việt Nam có tam quyền phân lập hay không?',
          stances: [
            { id: 'yes', label: 'Có', description: 'Việt Nam đã phân công lập pháp, hành pháp, tư pháp cho các cơ quan khác nhau.' },
            { id: 'no', label: 'Không', description: 'Khi một đảng kiểm soát toàn bộ hệ thống, việc phân quyền chỉ là hình thức.' },
          ],
          rounds: [
            {
              opponentArgument: 'Quốc hội Việt Nam làm luật, Chính phủ thi hành, Tòa án xét xử. Đó chẳng phải là phân quyền sao?',
              responseOptions: [
                { id: 'r1a', text: 'Đúng, Việt Nam có phân công quyền lực, chỉ là theo nguyên tắc "phân công phối hợp" thay vì phân lập.', score: 5, feedback: 'Đúng là có phân công, nhưng "phân công phối hợp" khác xa "phân lập" vì thiếu tính độc lập giữa các nhánh.' },
                { id: 'r1b', text: 'Phân công thôi chưa đủ — Montesquieu nhấn mạnh nhân sự mỗi nhánh phải độc lập. Ở Việt Nam, Đảng Cộng sản kiểm soát nhân sự cả ba nhánh.', score: 10, feedback: 'Xuất sắc! Đây là điểm mấu chốt. Montesquieu dùng ví dụ Venice: dù quyền lực được chia thành nhiều hội đồng, nhưng nhân sự đều từ một tầng lớp quý tộc, nên phân quyền vô nghĩa.' },
              ],
            },
            {
              opponentArgument: 'Nhưng ngay cả ở Mỹ, tổng thống cũng có ảnh hưởng lên tòa án qua việc bổ nhiệm thẩm phán. Có nước nào tam quyền phân lập hoàn hảo đâu?',
              responseOptions: [
                { id: 'r2a', text: 'Đúng, nhưng ở Mỹ có cơ chế kiểm soát: Thượng viện phải phê chuẩn, thẩm phán phục vụ trọn đời nên không bị tổng thống ép. Ở Việt Nam thiếu cơ chế này.', score: 10, feedback: 'Rất tốt! Sự khác biệt không phải ở mức độ hoàn hảo mà ở việc có cơ chế kiểm soát và đối trọng thực sự hay không.' },
                { id: 'r2b', text: 'Không có nước nào hoàn hảo, nhưng Việt Nam có Điều 4 Hiến pháp ghi nhận Đảng lãnh đạo toàn bộ — đây là trở ngại cấu trúc.', score: 8, feedback: 'Đúng. Điều 4 Hiến pháp là rào cản cấu trúc, khiến tam quyền phân lập không thể vận hành ngay cả khi có trên giấy.' },
              ],
            },
          ],
          conclusion: 'Cựu chủ tịch Quốc hội Nguyễn Văn An từng đề xuất tam quyền phân lập cho Việt Nam nhưng bỏ sót yếu tố quan trọng: nhân sự phải độc lập. Chừng nào Đảng Cộng sản kiểm soát toàn bộ hệ thống, các thiết chế chỉ là công cụ hợp pháp hóa sự cai trị.',
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Ghi nhớ',
          text: 'Hiến pháp + Tam quyền phân lập + Đảng phái cạnh tranh + Xã hội dân sự = Bốn trụ cột kiểm soát quyền lực. Thiếu bất kỳ trụ cột nào, quyền lực sẽ có xu hướng bị lạm dụng.',
        },
        {
          type: 'question',
          question: 'Theo Montesquieu, điều gì xảy ra khi cơ quan cầm quyền nắm cả lập pháp lẫn hành pháp?',
          options: [
            { id: 'a', text: 'Nhà nước sẽ hoạt động hiệu quả hơn', isCorrect: false },
            { id: 'b', text: 'Họ có thể tàn phá quốc gia bằng những ý chí sai lầm', isCorrect: true },
            { id: 'c', text: 'Người dân sẽ được bảo vệ tốt hơn', isCorrect: false },
            { id: 'd', text: 'Kinh tế sẽ phát triển nhanh hơn', isCorrect: false },
          ],
          explanation: 'Montesquieu cảnh báo: khi một cơ quan vừa làm luật vừa thi hành luật, họ có thể tàn phá quốc gia. Nếu nắm thêm quyền xét xử, họ đè nát mỗi công dân theo ý muốn.',
        },
      ],
    },
  });
  console.log(`  Lesson 3.3: ${lesson3_3.name}`);

  // --- Lesson 3.4: Xã hội dân sự ---
  const lesson3_4 = await prisma.lesson.create({
    data: {
      slug: 'xa-hoi-dan-su',
      name: 'Xã hội dân sự',
      levelId: level3.id,
      sortOrder: 3,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson3_4.id,
      title: 'Xã hội dân sự',
      blocks: [
        {
          type: 'text',
          title: 'Xã hội dân sự — Đối trọng với nhà nước',
          paragraphs: [
            'Trong tác phẩm "Hành lang hẹp" (The Narrow Corridor), Daron Acemoglu lập luận rằng tự do không phải là đích đến mà là một "hành lang hẹp". Sự đối trọng bình đẳng giữa nhà nước và xã hội dân sự sẽ giữ một quốc gia đi trên hành lang đó.',
            'Xã hội dân sự là lĩnh vực có tính tự nguyện, tự chủ tài chính, tự trị tổ chức, và tinh thần dân chủ.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Hai cách hiểu về xã hội dân sự',
          text: '1. Đời sống hiệp hội (associational life) — các tổ chức, hội nhóm tự nguyện bên ngoài nhà nước và thị trường. 2. Không gian công cộng (public sphere) — nơi công dân thảo luận về các vấn đề chung trong điều kiện tự do và bình đẳng.',
        },
        {
          type: 'text',
          title: 'Chức năng của xã hội dân sự',
          paragraphs: [
            'Theo Larry Diamond, vai trò đầu tiên và cơ bản nhất là hạn chế và kiểm soát quyền lực nhà nước. XHDS giám sát quan chức, nâng cao mối quan tâm của công chúng về lạm dụng quyền lực.',
            'Dưới sự giám sát của XHDS, Acemoglu lập luận rằng nhà nước không những phải tuân thủ trách nhiệm mà còn tự cải tiến để đương đầu với các thách thức phức tạp hơn.',
          ],
        },
        {
          type: 'cause-effect-chain',
          title: 'Mối quan hệ Nhà nước — XHDS — Tự do',
          instruction: 'Hãy kết nối các yếu tố để thể hiện mối quan hệ nhân quả giữa nhà nước, xã hội dân sự và tự do.',
          nodes: [
            { id: 'strong-state', text: 'Nhà nước mạnh', category: 'Nhà nước' },
            { id: 'strong-civil', text: 'XHDS phát triển', category: 'Xã hội' },
            { id: 'balance', text: 'Đối trọng cân bằng', category: 'Cơ chế' },
            { id: 'freedom', text: 'Tự do và ổn định', category: 'Kết quả' },
            { id: 'weak-civil', text: 'XHDS yếu', category: 'Xã hội' },
            { id: 'tyranny', text: 'Chuyên chế / Độc tài', category: 'Kết quả' },
            { id: 'weak-state', text: 'Nhà nước yếu', category: 'Nhà nước' },
            { id: 'chaos', text: 'Loạn lạc / Bất ổn', category: 'Kết quả' },
          ],
          correctConnections: [
            { fromId: 'strong-state', toId: 'balance' },
            { fromId: 'strong-civil', toId: 'balance' },
            { fromId: 'balance', toId: 'freedom' },
            { fromId: 'strong-state', toId: 'tyranny' },
            { fromId: 'weak-civil', toId: 'tyranny' },
            { fromId: 'weak-state', toId: 'chaos' },
          ],
          explanation: 'Theo Acemoglu, tự do đòi hỏi SỰ CÂN BẰNG giữa nhà nước mạnh VÀ XHDS phát triển. Nhà nước mạnh + XHDS yếu → độc tài. Nhà nước yếu → loạn lạc. Chỉ khi cả hai đều mạnh và đối trọng nhau thì xã hội mới đạt tự do.',
        },
        {
          type: 'text',
          title: 'Hệ sinh thái xã hội dân sự',
          paragraphs: [
            'XHDS mạnh khi các tổ chức liên kết với nhau. Ba yếu tố tạo nên phong trào xã hội thành công: (1) lý tưởng mạnh mẽ, (2) chiến lược truyền thông hiệu quả, (3) lực lượng quần chúng.',
            'Nếu hệ sinh thái XHDS thiếu chiều sâu và đa dạng, xã hội tăng nguy cơ bị cai trị độc tài. Đơn giản: nếu chỉ có một tờ báo độc lập, chính phủ dễ dàng bóp chết nó hơn là khi có nhiều tờ báo.',
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Ghi nhớ',
          text: 'Xã hội dân sự là trụ cột thứ tư trong kiểm soát quyền lực. Một mình nhà nước mạnh không đủ — cần XHDS để giữ nhà nước có trách nhiệm, tạo ra "hành lang hẹp" dẫn đến tự do.',
        },
        {
          type: 'question',
          question: 'Theo Daron Acemoglu, tự do đạt được khi nào?',
          options: [
            { id: 'a', text: 'Khi nhà nước yếu và người dân tự quản', isCorrect: false },
            { id: 'b', text: 'Khi nhà nước mạnh và kiểm soát mọi thứ', isCorrect: false },
            { id: 'c', text: 'Khi nhà nước mạnh và XHDS phát triển cân bằng nhau', isCorrect: true },
            { id: 'd', text: 'Khi không có nhà nước', isCorrect: false },
          ],
          explanation: 'Acemoglu lập luận rằng tự do là "hành lang hẹp" — cần cả nhà nước mạnh VÀ XHDS phát triển đối trọng nhau. Một bên quá mạnh dẫn đến độc tài hoặc loạn lạc.',
        },
      ],
    },
  });
  console.log(`  Lesson 3.4: ${lesson3_4.name}`);
  console.log(`Level 3 complete: 4 lessons\n`);

  // ============================================================
  // LEVEL 4: Chính trị nước nhà
  // ============================================================
  const level4 = await prisma.level.create({
    data: {
      name: 'Chính trị nước nhà',
      courseId: course.id,
      sortOrder: 3,
    },
  });
  console.log(`Level 4 created: ${level4.name}`);

  // --- Lesson 4.1: Hệ thống nhà nước Việt Nam ---
  const lesson4_1 = await prisma.lesson.create({
    data: {
      slug: 'he-thong-nha-nuoc-viet-nam',
      name: 'Hệ thống nhà nước Việt Nam',
      levelId: level4.id,
      sortOrder: 0,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson4_1.id,
      title: 'Hệ thống nhà nước Việt Nam',
      blocks: [
        {
          type: 'text',
          title: 'Hai hệ thống song hành',
          paragraphs: [
            'Hệ thống chính trị ở Việt Nam được cấu thành bởi hai hệ thống lớn: hệ thống nhà nước Cộng hòa xã hội chủ nghĩa Việt Nam, và hệ thống đảng Cộng sản Việt Nam.',
            'Nhà nước Việt Nam bao gồm các cơ quan lớn: Chính phủ, Quốc hội, Toà án và Viện Kiểm sát. Việc phân công nhiệm vụ giữa các cơ quan này không phải lúc nào cũng rõ ràng và độc lập.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Các cơ quan nhà nước chính',
          text: 'Chủ tịch nước: nguyên thủ quốc gia (Lương Cường). Chính phủ: cơ quan hành pháp, đứng đầu là Thủ tướng (Phạm Minh Chính). Quốc hội: cơ quan lập pháp, đứng đầu là Chủ tịch QH (Trần Thanh Mẫn). Toà án: cơ quan tư pháp. Viện Kiểm sát: thực hành quyền công tố.',
        },
        {
          type: 'text',
          title: 'Chủ tịch nước',
          paragraphs: [
            'Người đứng đầu nhà nước, do Quốc hội bầu ra dựa trên sự giới thiệu của Đảng Cộng sản. Có quyền: quyết định đặc xá, tuyên bố chiến tranh, đề nghị xem xét lại dự luật, ký ban hành luật.',
          ],
        },
        {
          type: 'text',
          title: 'Chính phủ',
          paragraphs: [
            'Cơ quan hành chính nhà nước cao nhất, thực hiện quyền hành pháp. Hiện có 14 bộ và 3 cơ quan ngang bộ. Chính phủ không làm luật nhưng xây dựng nghị định, ban hành thông tư, và soạn thảo dự luật trước khi trình Quốc hội.',
          ],
        },
        {
          type: 'text',
          title: 'Quốc hội',
          paragraphs: [
            'Cơ quan có quyền lực cao nhất trong bộ máy nhà nước, thực hiện quyền lập hiến, lập pháp, và giám sát. Gồm khoảng 500 đại biểu, bầu 5 năm/lần.',
            'Đặc trưng: Thủ tướng, bộ trưởng, chủ tịch tỉnh có thể vừa là đại biểu Quốc hội vừa đảm nhiệm chức vụ hành pháp — khác với nhiều quốc gia.',
          ],
        },
        {
          type: 'text',
          title: 'Toà án và Viện Kiểm sát',
          paragraphs: [
            'Toà án thực hiện quyền tư pháp — xét xử các vụ dân sự, hình sự, hành chính. Viện Kiểm sát thực hành quyền công tố — thay mặt nhà nước cáo buộc tội phạm.',
            'Lưu ý: Công an KHÔNG phải là cơ quan xét xử. Nếu người dân kiện ai đó, toà án mới là nơi giải quyết.',
          ],
        },
        {
          type: 'decision-tree',
          title: 'Bạn cần liên hệ cơ quan nào?',
          scenario: 'Bạn là một công dân Việt Nam gặp các tình huống khác nhau trong đời sống. Hãy chọn cơ quan phù hợp.',
          role: 'Công dân Việt Nam',
          startNodeId: 'start',
          nodes: [
            {
              id: 'start',
              text: 'Bạn gặp vấn đề cần giải quyết. Vấn đề của bạn là gì?',
              choices: [
                { id: 'c1', text: 'Tôi muốn kiện hàng xóm về tranh chấp đất đai', nextNodeId: 'court' },
                { id: 'c2', text: 'Tôi bị trộm cắp và cần báo án', nextNodeId: 'police' },
                { id: 'c3', text: 'Tôi muốn góp ý về một dự luật đang được thảo luận', nextNodeId: 'assembly' },
              ],
            },
            {
              id: 'court',
              text: 'Tranh chấp đất đai là vụ kiện dân sự. Bạn nên đến Toà án nhân dân cấp huyện/quận nơi có mảnh đất.',
              choices: [
                { id: 'c4', text: 'Nếu tôi không đồng ý với phán quyết thì sao?', nextNodeId: 'appeal' },
              ],
            },
            {
              id: 'appeal',
              text: 'Bạn có quyền kháng cáo lên Toà án cấp trên trong thời hạn luật định. Hệ thống toà án có nhiều cấp xét xử.',
              isEnding: true,
              endingType: 'good',
              endingSummary: 'Toà án là cơ quan tư pháp duy nhất có thẩm quyền xét xử. Hệ thống toà án nhiều cấp đảm bảo quyền kháng cáo.',
              choices: [],
            },
            {
              id: 'police',
              text: 'Đúng! Công an là cơ quan điều tra, tiếp nhận tin báo tội phạm. Tuy nhiên, ai quyết định bắt người?',
              choices: [
                { id: 'c5', text: 'Công an tự quyết định', nextNodeId: 'wrong-police' },
                { id: 'c6', text: 'Cần quyết định của Viện Kiểm sát', nextNodeId: 'right-vks' },
              ],
            },
            {
              id: 'wrong-police',
              text: 'Không đúng! Công an muốn bắt người hay khám nhà phải có quyết định của Viện Kiểm sát. Đây là cơ chế kiểm soát quan trọng.',
              isEnding: true,
              endingType: 'neutral',
              endingSummary: 'Viện Kiểm sát kiểm soát hoạt động điều tra của công an — đảm bảo không bắt người tùy tiện.',
              choices: [],
            },
            {
              id: 'right-vks',
              text: 'Chính xác! Viện Kiểm sát phải phê duyệt việc bắt người, khám nhà. Đây là cơ chế quan trọng để bảo vệ quyền công dân.',
              isEnding: true,
              endingType: 'good',
              endingSummary: 'Viện Kiểm sát thực hành quyền công tố và kiểm sát hoạt động tư pháp, bao gồm phê duyệt việc bắt người.',
              choices: [],
            },
            {
              id: 'assembly',
              text: 'Quốc hội là cơ quan lập pháp. Bạn có thể gửi ý kiến qua đại biểu Quốc hội tại địa phương hoặc qua cổng thông tin của Quốc hội.',
              isEnding: true,
              endingType: 'good',
              endingSummary: 'Quốc hội thực hiện quyền lập pháp và giám sát. Công dân có thể góp ý qua đại biểu hoặc khi Quốc hội lấy ý kiến công khai.',
              choices: [],
            },
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Ghi nhớ',
          text: 'Nhà nước Việt Nam gồm: Chủ tịch nước (nguyên thủ), Chính phủ (hành pháp), Quốc hội (lập pháp), Toà án (tư pháp), Viện Kiểm sát (công tố). Việc phân công giữa các cơ quan theo nguyên tắc "phân công phối hợp", không phải tam quyền phân lập.',
        },
        {
          type: 'question',
          question: 'Cơ quan nào ở Việt Nam có quyền phê duyệt việc bắt người và khám nhà?',
          options: [
            { id: 'a', text: 'Công an', isCorrect: false },
            { id: 'b', text: 'Toà án', isCorrect: false },
            { id: 'c', text: 'Viện Kiểm sát', isCorrect: true },
            { id: 'd', text: 'Quốc hội', isCorrect: false },
          ],
          explanation: 'Viện Kiểm sát thực hành quyền công tố và kiểm sát hoạt động tư pháp. Công an muốn bắt người hay khám nhà phải có quyết định của Viện Kiểm sát.',
        },
      ],
    },
  });
  console.log(`  Lesson 4.1: ${lesson4_1.name}`);

  // --- Lesson 4.2: Đảng Cộng sản Việt Nam ---
  const lesson4_2 = await prisma.lesson.create({
    data: {
      slug: 'dang-cong-san-viet-nam',
      name: 'Đảng Cộng sản Việt Nam',
      levelId: level4.id,
      sortOrder: 1,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson4_2.id,
      title: 'Đảng Cộng sản Việt Nam',
      blocks: [
        {
          type: 'text',
          title: 'Đảng Cộng sản Việt Nam — Cấu trúc quyền lực',
          paragraphs: [
            'ĐCSVN có hơn 5,2 triệu đảng viên (khoảng 5,29% dân số). Được thành lập ngày 3/2/1930, từ năm 1988 đến nay là đảng lãnh đạo duy nhất theo Điều 4 Hiến pháp.',
            'ĐCSVN sử dụng cả ngân sách nhà nước lẫn đảng phí. Năm 2021, ngân sách dự toán cho Văn phòng Trung ương Đảng là 2.699 tỷ đồng.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Nguyên tắc tổ chức',
          text: 'ĐCSVN tổ chức theo nguyên tắc "tập thể lãnh đạo, tập trung dân chủ". Cơ quan lãnh đạo cao nhất là Đại hội Đảng (họp 5 năm/lần, hơn 1.000 đại biểu), không phải Tổng bí thư.',
        },
        {
          type: 'text',
          title: 'Các cơ quan quan trọng',
          paragraphs: [
            'Ban Chấp hành Trung ương — cơ quan lãnh đạo giữa hai kỳ Đại hội, do Tổng bí thư đứng đầu (hiện là Tô Lâm). Họp 2 lần/năm.',
            'Bộ Chính trị — 18 người, bao gồm các vị trí lãnh đạo quan trọng nhất (Tổng bí thư, Chủ tịch nước, Thủ tướng, Chủ tịch QH). Có quyền quyết định chủ trương, chính sách, tổ chức, cán bộ.',
            'Ban Bí thư — 11 người, lãnh đạo công việc hàng ngày. Ủy ban Kiểm tra Trung ương — phụ trách kiểm tra, giám sát, kỷ luật trong đảng.',
          ],
        },
        {
          type: 'hidden-pattern',
          title: 'Nhận diện quyền lực thực sự',
          instruction: 'Quan sát bảng sau và tìm ra pattern: cơ quan nào có quyền lực thực tế lớn nhất?',
          table: {
            headers: ['Cơ quan', 'Số thành viên', 'Tần suất họp', 'Quyền quyết định'],
            rows: [
              ['Đại hội Đảng', '1.000+', '5 năm/lần', 'Đường lối lớn'],
              ['BCH Trung ương', '~200', '2 lần/năm', 'Bầu Tổng bí thư, nghị quyết'],
              ['Bộ Chính trị', '18', 'Thường xuyên', 'Chủ trương, chính sách, nhân sự'],
              ['Ban Bí thư', '11', 'Hàng ngày', 'Công việc hàng ngày'],
            ],
          },
          question: 'Từ bảng trên, cơ quan nào có quyền lực thực tế lớn nhất trong ĐCSVN?',
          options: [
            { id: 'a', text: 'Đại hội Đảng — vì là cơ quan cao nhất', isCorrect: false },
            { id: 'b', text: 'Bộ Chính trị — vì họp thường xuyên, ít người, quyết định nhân sự', isCorrect: true },
            { id: 'c', text: 'BCH Trung ương — vì bầu Tổng bí thư', isCorrect: false },
            { id: 'd', text: 'Ban Bí thư — vì xử lý công việc hàng ngày', isCorrect: false },
          ],
          explanation: 'Pattern: Cơ quan càng ÍT NGƯỜI và họp càng THƯỜNG XUYÊN thì quyền lực THỰC TẾ càng lớn. Bộ Chính trị (18 người, họp thường xuyên) quyết định chủ trương, chính sách, nhân sự — đây là quyền lực thực sự.',
          highlightColumns: [1, 2, 3],
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Ghi nhớ',
          text: 'Mặc dù Đại hội Đảng là cơ quan cao nhất trên giấy, quyền lực thực tế nằm ở Bộ Chính trị — nhóm 18 người quyết định mọi vấn đề quan trọng về chính sách và nhân sự.',
        },
        {
          type: 'question',
          question: 'Bộ Chính trị ĐCSVN hiện có bao nhiêu thành viên?',
          options: [
            { id: 'a', text: '11 người', isCorrect: false },
            { id: 'b', text: '18 người', isCorrect: true },
            { id: 'c', text: '200 người', isCorrect: false },
            { id: 'd', text: 'Hơn 1.000 người', isCorrect: false },
          ],
          explanation: 'Bộ Chính trị hiện có 18 thành viên, bao gồm Tổng bí thư, Chủ tịch nước, Thủ tướng, Chủ tịch QH, và các lãnh đạo quan trọng khác.',
        },
      ],
    },
  });
  console.log(`  Lesson 4.2: ${lesson4_2.name}`);

  // --- Lesson 4.3: Vai trò Đảng trong hệ thống ---
  const lesson4_3 = await prisma.lesson.create({
    data: {
      slug: 'vai-tro-dang-trong-he-thong',
      name: 'Vai trò của Đảng trong hệ thống chính trị',
      levelId: level4.id,
      sortOrder: 2,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson4_3.id,
      title: 'Vai trò của Đảng trong hệ thống chính trị',
      blocks: [
        {
          type: 'text',
          title: 'Đảng lãnh đạo — Nhà nước quản lý',
          paragraphs: [
            'ĐCSVN đưa ra quyết sách qua nghị quyết, văn bản của Bộ Chính trị và Ban Bí thư. Các cơ quan nhà nước ở các cấp triển khai và thực thi — gọi chung là "chủ trương của Đảng".',
            'Sự lãnh đạo của ĐCSVN thể hiện rõ trong cả bốn lĩnh vực: lập pháp, hành pháp, tư pháp, và nhân sự.',
          ],
        },
        {
          type: 'text',
          title: 'Trong lập pháp',
          paragraphs: [
            'ĐCSVN đặt ra chính sách sẽ được đưa vào luật — gọi là "thể chế hóa chủ trương đường lối của Đảng". Ví dụ: Luật đất đai 2013 — các chính sách về sở hữu đất được đề ra trong nghị quyết của BCH Trung ương năm 2012, khi luật vẫn đang soạn thảo.',
          ],
        },
        {
          type: 'text',
          title: 'Trong hành pháp và tư pháp',
          paragraphs: [
            'Trong hành pháp: ĐCSVN chỉ đạo chính phủ thực hiện chính sách. Trong tư pháp: nhân sự tòa án, viện kiểm sát đều có sự sắp xếp của Đảng. Chánh án và Viện trưởng đều là Ủy viên Trung ương.',
            'Trong các vụ án nghiêm trọng, tham nhũng, an ninh quốc gia — ĐCSVN có thể có ý kiến hay phương án xử lý, dù thông tin là mật.',
          ],
        },
        {
          type: 'argument-mapper',
          title: 'Phân tích lập luận',
          instruction: 'Đọc đoạn văn sau và phân loại mỗi phần thành: tiền đề (premise), kết luận (conclusion), bằng chứng (evidence), hoặc ngụy biện (fallacy).',
          passage: 'ĐCSVN lãnh đạo nhà nước theo Điều 4 Hiến pháp. Đảng quyết định nhân sự ở cả ba nhánh quyền lực. Bầu cử đại biểu Quốc hội cũng có sự chỉ đạo của Đảng. Chưa có ai tự ứng cử vào các chức danh lãnh đạo chủ chốt. Do đó, tam quyền phân lập ở Việt Nam chỉ tồn tại trên giấy.',
          elements: [
            { id: 'e1', text: 'ĐCSVN lãnh đạo nhà nước theo Điều 4 Hiến pháp', startIndex: 0, endIndex: 50, correctType: 'premise', explanation: 'Đây là tiền đề pháp lý — cơ sở hiến định cho vai trò lãnh đạo của Đảng.' },
            { id: 'e2', text: 'Đảng quyết định nhân sự ở cả ba nhánh quyền lực', startIndex: 52, endIndex: 100, correctType: 'evidence', explanation: 'Đây là bằng chứng thực tế chứng minh Đảng kiểm soát toàn bộ hệ thống.' },
            { id: 'e3', text: 'Bầu cử đại biểu Quốc hội cũng có sự chỉ đạo của Đảng', startIndex: 102, endIndex: 156, correctType: 'evidence', explanation: 'Thêm bằng chứng — kể cả quá trình dân chủ (bầu cử) cũng bị kiểm soát.' },
            { id: 'e4', text: 'Chưa có ai tự ứng cử vào các chức danh lãnh đạo chủ chốt', startIndex: 158, endIndex: 216, correctType: 'evidence', explanation: 'Bằng chứng bổ sung về sự kiểm soát nhân sự.' },
            { id: 'e5', text: 'Do đó, tam quyền phân lập ở Việt Nam chỉ tồn tại trên giấy', startIndex: 218, endIndex: 278, correctType: 'conclusion', explanation: 'Đây là kết luận được rút ra từ các tiền đề và bằng chứng trên.' },
          ],
          elementTypes: [
            { id: 'premise', label: 'Tiền đề', color: '#3B82F6' },
            { id: 'conclusion', label: 'Kết luận', color: '#EF4444' },
            { id: 'evidence', label: 'Bằng chứng', color: '#10B981' },
            { id: 'fallacy', label: 'Ngụy biện', color: '#F59E0B' },
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Góc nhìn đa chiều',
          text: 'Khi tìm hiểu về chính trị Việt Nam đương đại, việc hiểu vai trò của ĐCSVN là thiết yếu vì mọi chính sách, nhân sự, và sinh hoạt chính trị đều chịu tác động bởi sự lãnh đạo của Đảng.',
        },
        {
          type: 'question',
          question: '"Thể chế hóa chủ trương đường lối của Đảng" có nghĩa là gì?',
          options: [
            { id: 'a', text: 'Đảng trực tiếp làm luật thay Quốc hội', isCorrect: false },
            { id: 'b', text: 'Đưa các chính sách mà Đảng đặt ra vào luật pháp', isCorrect: true },
            { id: 'c', text: 'Quốc hội tự quyết định mọi chính sách', isCorrect: false },
            { id: 'd', text: 'Đảng bãi bỏ các luật cũ', isCorrect: false },
          ],
          explanation: 'ĐCSVN đặt ra chính sách qua nghị quyết, sau đó các cơ quan nhà nước (đặc biệt Quốc hội) "thể chế hóa" — tức đưa các chính sách đó vào luật pháp chính thức.',
        },
      ],
    },
  });
  console.log(`  Lesson 4.3: ${lesson4_3.name}`);
  console.log(`Level 4 complete: 3 lessons\n`);

  // ============================================================
  // LEVEL 5: Thực hành chính trị
  // ============================================================
  const level5 = await prisma.level.create({
    data: {
      name: 'Thực hành chính trị',
      courseId: course.id,
      sortOrder: 4,
    },
  });
  console.log(`Level 5 created: ${level5.name}`);

  // --- Lesson 5.1: XHDS ở Việt Nam ---
  const lesson5_1 = await prisma.lesson.create({
    data: {
      slug: 'xhds-o-viet-nam',
      name: 'Xã hội dân sự ở Việt Nam',
      levelId: level5.id,
      sortOrder: 0,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson5_1.id,
      title: 'Xã hội dân sự ở Việt Nam',
      blocks: [
        {
          type: 'text',
          title: 'Các loại hình tổ chức XHDS tại Việt Nam',
          paragraphs: [
            'Pháp luật Việt Nam không có định nghĩa chính thức cho các tổ chức xã hội dân sự. Các nhà nghiên cứu đã phân loại thành bốn nhóm:',
            '1. Các tổ chức quần chúng của nhà nước — thuộc Mặt trận Tổ quốc (Hội Phụ nữ, Đoàn Thanh niên, Liên đoàn Lao động...), được Đảng lãnh đạo và phân bổ ngân sách.',
            '2. Các tổ chức phi chính phủ quốc tế (INGO) — có mặt từ thời chiến tranh, bùng nổ sau Đổi mới. Đem vào các khái niệm như "phát triển có sự tham gia" và "công bằng giới".',
            '3. Các tổ chức phi chính phủ Việt Nam (VNGO) có đăng ký — thường đăng ký dưới VUFO hoặc VUSTA, hoặc dưới dạng doanh nghiệp xã hội.',
            '4. Các hội nhóm cộng đồng không đăng ký — không có tư cách pháp nhân, không thể mở tài khoản ngân hàng hay ký hợp đồng.',
          ],
        },
        {
          type: 'source-ranker',
          title: 'Đánh giá độ tin cậy và độc lập của các tổ chức',
          event: 'Một nghiên cứu về quyền lao động ở Việt Nam',
          instruction: 'Hãy xếp hạng độ TIN CẬY và ĐỘC LẬP của mỗi loại tổ chức khi thực hiện nghiên cứu này. Kéo thả để sắp xếp từ đáng tin cậy nhất (trên) đến ít đáng tin nhất (dưới).',
          sources: [
            {
              id: 'mass-org',
              name: 'Tổ chức quần chúng (Liên đoàn Lao động VN)',
              excerpt: 'Báo cáo: "Quyền lợi người lao động đã được cải thiện đáng kể nhờ sự lãnh đạo của Đảng và Nhà nước."',
              credibilityScore: 3,
              explanation: 'Tổ chức quần chúng thuộc Mặt trận Tổ quốc, được Đảng lãnh đạo. Thiếu tính độc lập nên khó đưa ra đánh giá khách quan.',
              redFlags: ['Được nhà nước tài trợ và lãnh đạo', 'Thiếu tính độc lập'],
              greenFlags: ['Có mạng lưới rộng, dữ liệu cơ sở'],
            },
            {
              id: 'ingo',
              name: 'Tổ chức quốc tế (ILO)',
              excerpt: 'Báo cáo: "Việt Nam đã ký nhiều công ước ILO nhưng việc thực thi còn nhiều thách thức, đặc biệt về quyền tự do lập hội."',
              credibilityScore: 9,
              explanation: 'Tổ chức quốc tế uy tín, phương pháp nghiên cứu chuẩn, độc lập với chính phủ Việt Nam.',
              greenFlags: ['Phương pháp nghiên cứu chuẩn quốc tế', 'Độc lập', 'Uy tín toàn cầu'],
            },
            {
              id: 'vngo',
              name: 'VNGO có đăng ký (Trung tâm nghiên cứu lao động)',
              excerpt: 'Báo cáo: "Người lao động gặp khó khăn trong việc thành lập công đoàn độc lập, phần lớn phải qua Liên đoàn Lao động."',
              credibilityScore: 7,
              explanation: 'VNGO có đăng ký có thể đưa ra đánh giá tương đối khách quan, nhưng phải hoạt động dưới "ô che" của cơ quan chủ quản nên có giới hạn.',
              greenFlags: ['Am hiểu bối cảnh địa phương', 'Có dữ liệu thực tế'],
              redFlags: ['Phải qua cơ quan chủ quản', 'Có thể bị hạn chế nội dung'],
            },
            {
              id: 'community',
              name: 'Hội nhóm cộng đồng không đăng ký',
              excerpt: 'Chia sẻ trên mạng xã hội: "Mình bị ép tăng ca nhưng không biết kêu ai, công đoàn ở công ty không giúp gì."',
              credibilityScore: 5,
              explanation: 'Trải nghiệm cá nhân thực tế nhưng không có phương pháp nghiên cứu hệ thống, dễ bị thiên kiến.',
              greenFlags: ['Trải nghiệm trực tiếp', 'Không bị kiểm duyệt'],
              redFlags: ['Không có phương pháp nghiên cứu', 'Thiên kiến cá nhân'],
            },
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Ghi nhớ',
          text: 'XHDS ở Việt Nam đa dạng nhưng bị giới hạn. Các tổ chức quần chúng thiếu độc lập, VNGO phải hoạt động dưới "ô che", và nhiều hội nhóm không thể đăng ký. Sự thiếu vắng XHDS mạnh là thách thức cho kiểm soát quyền lực.',
        },
        {
          type: 'question',
          question: 'Tại sao nhiều VNGO ở Việt Nam đăng ký dưới dạng doanh nghiệp xã hội?',
          options: [
            { id: 'a', text: 'Vì doanh nghiệp xã hội có lợi nhuận cao hơn', isCorrect: false },
            { id: 'b', text: 'Vì khó đáp ứng điều kiện đăng ký thành lập hội', isCorrect: true },
            { id: 'c', text: 'Vì nhà nước khuyến khích hình thức này', isCorrect: false },
            { id: 'd', text: 'Vì INGO yêu cầu như vậy', isCorrect: false },
          ],
          explanation: 'Do các khó khăn trong việc đăng ký thành lập hội (cần 100+ thành viên, trụ sở cố định, phê duyệt nhà nước), nhiều tổ chức chọn đăng ký dưới dạng doanh nghiệp xã hội để có tư cách pháp nhân.',
        },
      ],
    },
  });
  console.log(`  Lesson 5.1: ${lesson5_1.name}`);

  // --- Lesson 5.2: Giới hạn pháp lý với XHDS ---
  const lesson5_2 = await prisma.lesson.create({
    data: {
      slug: 'gioi-han-phap-ly-voi-xhds',
      name: 'Giới hạn pháp lý đối với xã hội dân sự',
      levelId: level5.id,
      sortOrder: 1,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson5_2.id,
      title: 'Giới hạn pháp lý đối với xã hội dân sự',
      blocks: [
        {
          type: 'text',
          title: 'Vùng xám pháp lý',
          paragraphs: [
            'Quyền tự do hội họp và biểu tình được ghi nhận tại Điều 25 Hiến pháp 2013, nhưng "theo quy định của pháp luật". Trên thực tế, nhiều quy định tạo ra vùng xám khó phân định.',
            'Nghị định 38/2005 quy định hoạt động tập trung đông người phải đăng ký trước. Thông tư 09/2005 còn yêu cầu từ 5 người trở lên tại nơi công cộng phải đăng ký, chỉ được diễn ra từ 8h đến 17h.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Khó khăn trong đăng ký thành lập hội',
          text: 'Nghị định 45/2010 yêu cầu: trụ sở cố định, ít nhất 100 thành viên cho hội liên tỉnh, sự phê duyệt nhà nước cho thành viên sáng lập và điều lệ. Nghiên cứu cho thấy có sự phân biệt: quan chức nghỉ hưu đăng ký dễ hơn, các tổ chức về nhân quyền hoặc chống tham nhũng khó hơn.',
        },
        {
          type: 'text',
          title: 'Hệ quả của "vùng xám"',
          paragraphs: [
            'Không đăng ký được = không có tư cách pháp nhân = không mở tài khoản, nhận tài trợ, ký hợp đồng. Nhiều tổ chức phải đứng dưới "ô che" của VUSTA hay VUFO — chương trình và nguồn quỹ phải được cơ quan chủ quản chấp thuận.',
            'Về hội họp: nhiều hoạt động bị dừng do áp lực an ninh — yêu cầu địa điểm từ chối dịch vụ, triệu tập người tham gia, yêu cầu hủy bằng miệng. Nhưng cũng có hoạt động diễn ra không gặp cản trở dù không có giấy phép.',
          ],
        },
        {
          type: 'propaganda-detector',
          title: 'Nhận diện kỹ thuật tuyên truyền',
          instruction: 'Đọc đoạn văn sau và nhận diện các kỹ thuật tuyên truyền được sử dụng.',
          article: {
            text: 'Các thế lực thù địch đang lợi dụng xã hội dân sự để thực hiện âm mưu diễn biến hòa bình, chống phá Đảng và Nhà nước. Những tổ chức NGO nhận tiền nước ngoài thực chất là công cụ của các thế lực bên ngoài. Mọi công dân yêu nước đều phải cảnh giác trước những hoạt động này để bảo vệ sự ổn định và phát triển của đất nước.',
            source: 'Báo điện tử (ví dụ minh họa)',
            context: 'Đoạn văn này sử dụng nhiều kỹ thuật tuyên truyền phổ biến để tạo sự nghi ngờ đối với xã hội dân sự.',
          },
          segments: [
            {
              id: 's1',
              text: 'Các thế lực thù địch',
              startIndex: 0,
              techniqueType: 'enemy-creation',
              explanation: 'Tạo kẻ thù mơ hồ ("thế lực thù địch") để khiến người đọc sợ hãi mà không cần chứng minh cụ thể.',
            },
            {
              id: 's2',
              text: 'diễn biến hòa bình',
              startIndex: 63,
              techniqueType: 'loaded-language',
              explanation: '"Diễn biến hòa bình" là thuật ngữ mang tính quy kết — biến mọi hoạt động xã hội dân sự thành âm mưu chính trị.',
            },
            {
              id: 's3',
              text: 'nhận tiền nước ngoài thực chất là công cụ',
              startIndex: 130,
              techniqueType: 'guilt-by-association',
              explanation: 'Đánh đồng việc nhận tài trợ quốc tế (bình thường trong XHDS toàn cầu) với việc làm tay sai.',
            },
            {
              id: 's4',
              text: 'Mọi công dân yêu nước đều phải',
              startIndex: 195,
              techniqueType: 'bandwagon',
              explanation: 'Gắn "yêu nước" với việc đồng ý, tạo áp lực xã hội: ai không đồng ý = không yêu nước.',
            },
          ],
          techniqueOptions: [
            { id: 'enemy-creation', label: 'Tạo kẻ thù', description: 'Tạo ra kẻ thù mơ hồ để gây sợ hãi' },
            { id: 'loaded-language', label: 'Ngôn ngữ quy kết', description: 'Dùng thuật ngữ mang sẵn định kiến tiêu cực' },
            { id: 'guilt-by-association', label: 'Đánh đồng', description: 'Gắn một hành vi bình thường với ý đồ xấu' },
            { id: 'bandwagon', label: 'Áp lực số đông', description: 'Tạo áp lực phải đồng ý với đa số' },
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Ghi nhớ',
          text: 'XHDS ở Việt Nam hoạt động trong "vùng xám" — không bị cấm hoàn toàn nhưng cũng không được tự do. Diễn ngôn về "diễn biến hòa bình" và "thế lực thù địch" được sử dụng để hạn chế không gian hoạt động.',
        },
        {
          type: 'question',
          question: 'Tại sao việc nhiều tổ chức XHDS phải hoạt động dưới "ô che" là một hạn chế?',
          options: [
            { id: 'a', text: 'Vì chi phí đăng ký cao', isCorrect: false },
            { id: 'b', text: 'Vì chương trình và nguồn quỹ phải được cơ quan chủ quản phê duyệt', isCorrect: true },
            { id: 'c', text: 'Vì cơ quan chủ quản thường từ chối', isCorrect: false },
            { id: 'd', text: 'Vì luật cấm hoàn toàn XHDS', isCorrect: false },
          ],
          explanation: 'Hoạt động dưới "ô che" nghĩa là mọi chương trình, nguồn quỹ, hợp tác đều phải qua sự phê duyệt của cơ quan chủ quản — hạn chế tính độc lập và khả năng giám sát nhà nước.',
        },
      ],
    },
  });
  console.log(`  Lesson 5.2: ${lesson5_2.name}`);

  // --- Lesson 5.3: Vượt qua vùng xám ---
  const lesson5_3 = await prisma.lesson.create({
    data: {
      slug: 'vuot-qua-vung-xam',
      name: 'Vượt qua vùng xám — Thực hành chính trị tại Việt Nam',
      levelId: level5.id,
      sortOrder: 2,
    },
  });
  await prisma.lessonContent.create({
    data: {
      lessonId: lesson5_3.id,
      title: 'Vượt qua vùng xám — Thực hành chính trị tại Việt Nam',
      blocks: [
        {
          type: 'text',
          title: 'Chiến thuật của xã hội dân sự Việt Nam',
          paragraphs: [
            'Mặc dù hoạt động trong vùng xám, nhiều tổ chức XHDS đã tìm cách vượt qua giới hạn bằng các chiến thuật linh hoạt.',
          ],
        },
        {
          type: 'text',
          title: '1. Duy trì liên lạc phi chính thức',
          paragraphs: [
            'Nhiều tổ chức duy trì đối thoại với lực lượng an ninh và chính quyền để biết đâu là giới hạn. Ví dụ: Ban tổ chức Viet Pride 2013 nhận điện thoại từ quan chức yêu cầu đoàn xe không đi vào trung tâm thành phố — họ chuyển hướng và hoạt động vẫn diễn ra.',
          ],
        },
        {
          type: 'text',
          title: '2. Chiến thuật "nhẹ nhàng, vui vẻ, hòa bình"',
          paragraphs: [
            'Viet Pride tổ chức diễu hành theo hướng không đối đầu: đi thành nhóm, không hô lớn, không dùng cờ và banner kích thước lớn. Các slogan chỉ chứa thông điệp về tình yêu như "Love is love".',
            'Tương tự, phong trào bảo vệ 6.700 cây xanh ở Hà Nội tổ chức "Picnic Tree Hugs" — hội họp, hát ca, vẽ tranh, mang cây con để biểu thị thông điệp yêu cây một cách ôn hòa.',
          ],
        },
        {
          type: 'text',
          title: '3. Tận dụng tư cách pháp nhân bên thứ ba',
          paragraphs: [
            'Thay vì xin phép chính quyền, một số tổ chức sử dụng tư cách pháp nhân của khách sạn hay đơn vị cung cấp địa điểm. Một diễn đàn LGBT đã tổ chức buổi offline với hơn 300 người trong quán cafe mà không phải xin phép.',
          ],
        },
        {
          type: 'text',
          title: '4. Sử dụng công nghệ và truyền thông',
          paragraphs: [
            'YouTube, mạng xã hội trở thành công cụ tham chính. Team Ếch Phu Hồ dùng video trên YouTube để nâng cao nhận thức công chúng về vấn đề ngân sách — một cách tham chính hiệu quả.',
            'Cộng đồng LGBTIQ+ tham gia góp ý dự thảo Bộ luật Dân sự sửa đổi 2015, dẫn đến việc ghi nhận quyền chuyển đổi giới tính.',
          ],
        },
        {
          type: 'scenario-what-if',
          title: 'Kịch bản giả định',
          scenario: 'Nếu Việt Nam ban hành Luật Biểu tình với quy trình đăng ký rõ ràng và minh bạch, điều gì sẽ xảy ra?',
          historicalContext: 'Hiện tại, quyền biểu tình được ghi nhận trong Hiến pháp nhưng chưa có luật cụ thể. Nghị định 38/2005 yêu cầu đăng ký nhưng thiếu quy trình rõ ràng, tạo ra "vùng xám" nơi hoạt động có thể bị cho phép hoặc ngăn chặn tùy ý.',
          predictions: [
            { id: 'p1', text: 'Các cuộc biểu tình sẽ diễn ra thường xuyên và ôn hòa hơn', likelihood: 'likely', explanation: 'Khi có khung pháp lý rõ ràng, người tổ chức biết trước quy trình, giảm xung đột với chính quyền. Kinh nghiệm từ nhiều nước cho thấy luật biểu tình rõ ràng giúp hoạt động ôn hòa hơn.' },
            { id: 'p2', text: 'Chính quyền sẽ mất hoàn toàn khả năng kiểm soát', likelihood: 'unlikely', explanation: 'Luật biểu tình ở các nước dân chủ vẫn có quy định về thời gian, địa điểm, an ninh — không phải "tự do tuyệt đối". Luật minh bạch giúp cả hai bên dự đoán và quản lý tốt hơn.' },
            { id: 'p3', text: 'Xã hội dân sự sẽ phát triển mạnh hơn', likelihood: 'likely', explanation: 'Khi có không gian pháp lý rõ ràng, các tổ chức XHDS có thể hoạt động hiệu quả hơn, đóng góp vào giám sát quyền lực và cải thiện chính sách.' },
            { id: 'p4', text: 'Bất ổn chính trị sẽ gia tăng', likelihood: 'possible', explanation: 'Có thể có giai đoạn chuyển tiếp với nhiều hoạt động hơn bình thường, nhưng kinh nghiệm quốc tế cho thấy về lâu dài, không gian dân sự hợp pháp giúp giảm xung đột.' },
          ],
          realOutcome: 'Tính đến hiện tại, Luật Biểu tình vẫn chưa được ban hành dù đã nhiều lần được đưa vào chương trình xây dựng luật. Việt Nam tiếp tục nhận khuyến nghị từ Ủy ban Nhân quyền LHQ về việc này.',
          analysis: 'Sự thiếu vắng khung pháp lý minh bạch tạo ra vùng xám bất lợi cho cả người dân (không biết đâu là ranh giới) lẫn chính quyền (thiếu cơ sở pháp lý rõ ràng). Kinh nghiệm quốc tế cho thấy luật minh bạch giúp quản lý tốt hơn là cấm đoán mơ hồ.',
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Tổng kết khoá học',
          text: 'Chính trị ảnh hưởng đến mọi người. Hiểu về nhà nước, thể chế, quyền lực, và xã hội dân sự giúp chúng ta trở thành "công dân tích cực" — tham gia đời sống cộng đồng một cách có hiểu biết và có trách nhiệm.',
        },
        {
          type: 'question',
          question: 'Chiến thuật nào KHÔNG phải là cách XHDS Việt Nam vượt qua "vùng xám"?',
          options: [
            { id: 'a', text: 'Duy trì liên lạc phi chính thức với chính quyền', isCorrect: false },
            { id: 'b', text: 'Tổ chức hoạt động "nhẹ nhàng, vui vẻ, hòa bình"', isCorrect: false },
            { id: 'c', text: 'Đối đầu trực diện với lực lượng an ninh', isCorrect: true },
            { id: 'd', text: 'Sử dụng tư cách pháp nhân của bên thứ ba', isCorrect: false },
          ],
          explanation: 'XHDS Việt Nam thường chọn chiến thuật mềm: đối thoại, không đối đầu, tận dụng pháp nhân bên thứ ba, sử dụng mạng xã hội. Đối đầu trực diện thường dẫn đến đàn áp và thất bại.',
        },
      ],
    },
  });
  console.log(`  Lesson 5.3: ${lesson5_3.name}`);
  console.log(`Level 5 complete: 3 lessons\n`);

  console.log('\n✅ Course "Chính trị là gì?" seeded successfully!');
  console.log(`Total: ${course.name}`);
  console.log(`  Level 1: 3 lessons`);
  console.log(`  Level 2: 3 lessons`);
  console.log(`  Level 3: 4 lessons`);
  console.log(`  Level 4: 3 lessons`);
  console.log(`  Level 5: 3 lessons`);
  console.log(`  TOTAL: 16 lessons`);

  await pool.end();
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
