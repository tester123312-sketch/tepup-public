/**
 * Script to UPDATE Level 1 content of "Của dân, do dân, vì dân" — VERSION 2
 *
 * Bổ sung nội dung đào sâu (beyond fact-check fixes):
 * - Bài 1: "Third Wave of Democracy" (Huntington) + library-doc về EIU methodology
 * - Bài 2: Mở rộng quyền tự do cá nhân + library-doc "Dân chủ & Phát triển con người"
 * - Bài 3: Principal-Agent problem + library-doc "Brexit — Bài học trưng cầu dân ý"
 *
 * Run with: npx tsx scripts/update-danchu101-level1-v2.ts
 */

import 'dotenv/config';
import { prisma } from '../lib/prisma';

const updatedLessonContents: Record<string, { title: string; blocks: any[] }> = {

  // ────────────────────────────────────────────────────────────────
  // LESSON 1: Ai đang cai trị? — 4 loại thể chế chính trị
  // v2 additions:
  //   - Body2: Thêm "Third Wave of Democracy" (Huntington 1974)
  //   - New library-document: EIU Democracy Index methodology
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
          'Nếu một xã hội được cai trị bởi một số ít người, thì gọi là oligarchy (thiểu số trị). Đây là chế độ tương tự như trong phim Hunger Games — một nhóm nhỏ Elite kiểm soát toàn bộ xã hội. Oligarchy còn có các biến thể: aristocracy (quý tộc và tầng lớp elite), plutocracy (tài phiệt giàu có), và military junta (tướng tá quân đội). Myanmar là ví dụ điển hình của military junta — quân đội đảo chính năm 1962 và nắm quyền gần như liên tục trong gần 50 năm (1962–2011), rồi đảo chính lại vào năm 2021.',
          'Và cuối cùng, nếu xã hội được cai trị bởi rất nhiều người — mọi người đều được tham gia — thì gọi là democracy (dân chủ).',
        ],
      },
      {
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Democracy_Index_2022.svg',
        alt: 'Bản đồ chỉ số dân chủ toàn cầu 2022 — màu xanh đậm là dân chủ hoàn toàn, xanh nhạt là dân chủ khiếm khuyết, vàng là chế độ hỗn hợp, đỏ là chế độ độc tài',
        caption:
          'Chỉ số dân chủ toàn cầu 2022 (Economist Intelligence Unit). Trên 167 quốc gia được xếp hạng: chỉ 24 nước là "dân chủ hoàn toàn" (8% dân số thế giới), 59 nước là "chế độ độc tài" (36.9% dân số). Việt Nam xếp hạng ~131/167 — nhóm authoritarian. Nguồn: Wikimedia Commons (CC BY-SA 4.0)',
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
          'Học giả Samuel Huntington (Đại học Harvard) gọi quá trình này là "Ba làn sóng dân chủ hoá" (Three Waves of Democratization). Làn sóng thứ nhất (1828–1926): dân chủ nở rộ ở Tây Âu và Mỹ. Làn sóng thứ hai (1943–1962): dân chủ hoá sau Thế chiến II. Làn sóng thứ ba (1974 đến nay): bắt đầu từ Cách mạng Cẩm chướng ở Bồ Đào Nha năm 1974, lan qua Mỹ Latin, Đông Á, Đông Âu — hơn 60 quốc gia chuyển sang dân chủ chỉ trong vài thập kỷ.',
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
                'Aristocracy: quyền lực thuộc về tầng lớp quý tộc, được xác định bởi dòng tộc hoặc địa vị xã hội. Ví dụ: châu Âu thời Trung Cổ khi dòng dõi quyết định tất cả.',
                'Plutocracy: quyền lực thuộc về người giàu. Ví dụ điển hình: sau khi Liên Xô tan rã năm 1991, một nhóm nhỏ doanh nhân Nga mua lại tài sản nhà nước với giá rẻ và trở thành tầng lớp "oligarchs" — họ không chỉ giàu mà còn kiểm soát cả chính trị lẫn truyền thông.',
                'Military Junta: quyền lực thuộc về giới tướng lĩnh quân đội. Myanmar là ví dụ điển hình: từ cuộc đảo chính năm 1962 đến năm 2011 (gần 50 năm), đất nước bị cai trị bởi một hội đồng tướng lĩnh. Sau một thập kỷ chuyển tiếp dân chủ (2011–2021), quân đội lại đảo chính vào tháng 2/2021.',
              ],
            },
          ],
          relatedConcepts: ['Democracy', 'Autocracy', 'Oligarchy', 'Separation of powers'],
          furtherReading: [
            'https://en.wikipedia.org/wiki/Government',
            'https://en.wikipedia.org/wiki/Democracy',
            'https://en.wikipedia.org/wiki/Oligarchy',
          ],
        },
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Chỉ số Dân chủ EIU — Đo lường dân chủ như thế nào?',
        description:
          'Economist Intelligence Unit đánh giá mức độ dân chủ của 167 quốc gia mỗi năm dựa trên 5 tiêu chí',
        category: 'Chính trị học',
        estimatedReadTime: '5 phút',
        documentContent: {
          sections: [
            {
              heading: '5 tiêu chí đánh giá',
              paragraphs: [
                'EIU đánh giá mỗi quốc gia trên thang điểm 0–10 theo 5 tiêu chí, sau đó lấy trung bình để ra chỉ số tổng thể:',
                '1. Bầu cử và đa nguyên (Electoral process and pluralism): Bầu cử có tự do và công bằng không? Có nhiều đảng phái cạnh tranh không? Cử tri có thực sự có lựa chọn không?\n2. Chính phủ vận hành thế nào (Functioning of government): Chính phủ có thực thi luật pháp minh bạch không? Quốc hội có thực quyền kiểm soát hành pháp không?\n3. Tham gia chính trị (Political participation): Tỷ lệ đi bầu, sự tham gia của công dân vào chính trị, tự do lập hội và biểu tình.\n4. Văn hóa chính trị (Political culture): Xã hội có ủng hộ các giá trị dân chủ không? Có sự đồng thuận về tính hợp pháp của nhà nước không?\n5. Tự do dân sự (Civil liberties): Tự do ngôn luận, tự do báo chí, tự do tôn giáo, quyền của thiểu số.',
              ],
            },
            {
              heading: 'Bốn nhóm phân loại',
              paragraphs: [
                'Dựa trên điểm tổng (0–10), các quốc gia được xếp vào 4 nhóm:\n\n• Full Democracy (Dân chủ hoàn toàn): ≥ 8.0 điểm — 24 quốc gia năm 2022 (Na Uy, Đan Mạch, Thụy Điển, New Zealand, Úc...)\n• Flawed Democracy (Dân chủ khiếm khuyết): 6.0–7.99 — 48 quốc gia (Mỹ: 7.85, Pháp: 7.99...)\n• Hybrid Regime (Chế độ hỗn hợp): 4.0–5.99 — 36 quốc gia\n• Authoritarian Regime (Chế độ độc tài): < 4.0 — 59 quốc gia',
                'Việt Nam trong DI 2022: khoảng 2.94 điểm, xếp hạng ~131/167 — nhóm authoritarian. Điểm thấp đặc biệt ở tiêu chí "Bầu cử và đa nguyên" và "Tự do dân sự", cao hơn đôi chút ở "Tham gia chính trị" (do một số hình thức tham gia cơ sở vẫn tồn tại).',
              ],
            },
            {
              heading: 'Mỹ là "dân chủ khiếm khuyết"?',
              paragraphs: [
                'Một điều thú vị: từ năm 2016, EIU hạ xếp loại của Mỹ từ "full democracy" xuống "flawed democracy" (dân chủ khiếm khuyết). Lý do chính: suy giảm lòng tin của công chúng vào thể chế, phân cực chính trị sâu sắc, và một số tiêu chí về chức năng chính phủ.',
                'Điều này cho thấy: dân chủ không phải trạng thái tĩnh. Ngay cả những nền dân chủ lâu đời cũng có thể suy yếu nếu không được chăm sóc — và cũng có thể được cải thiện nếu có ý chí chính trị và sự tham gia của công dân.',
              ],
            },
          ],
          relatedConcepts: ['Democracy Index', 'Civil liberties', 'Electoral systems', 'Freedom of press'],
          furtherReading: [
            'https://en.wikipedia.org/wiki/The_Economist_Democracy_Index',
            'https://en.wikipedia.org/wiki/Liberal_democracy',
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — Bạn đã học được gì?',
        text: '✓ 4 loại thể chế chính trị: Anarchy, Autocracy, Oligarchy, Democracy\n✓ Autocracy bao gồm: Monarchy (quân chủ) và Dictatorship (độc tài)\n✓ Oligarchy bao gồm: Aristocracy, Plutocracy, Military Junta\n✓ Dân chủ chỉ phổ biến trong ~200-300 năm gần đây\n✓ "Ba làn sóng dân chủ hoá" — làn sóng thứ 3 từ 1974 tạo ra bước nhảy vọt lớn nhất\n✓ EIU đánh giá dân chủ qua 5 tiêu chí; năm 2022 chỉ 24/167 quốc gia đạt "full democracy"',
        variant: 'success',
      },
      {
        type: 'question',
        question:
          'Theo cách phân loại trong podcast, chế độ quân sự ở Myanmar (đảo chính 1962 và 2021) là ví dụ của thể chế nào?',
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
          'Chế độ quân sự ở Myanmar là ví dụ điển hình của "military junta" — một dạng oligarchy trong đó quyền lực nằm trong tay một nhóm các tướng tá quân đội (một nhóm nhỏ, không phải một người). Quân đội đảo chính năm 1962 và cai trị gần 50 năm, rồi đảo chính lại năm 2021 sau một thập kỷ chuyển tiếp dân chủ. Dù có thể có một nhân vật lãnh đạo nổi bật, quyền lực thực chất phân bổ trong hàng ngũ quân đội cấp cao.',
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
  // v2 additions:
  //   - Body1: Mở rộng quyền tự do cá nhân với ví dụ cụ thể
  //   - New library-document: "Dân chủ và phát triển con người" (Amartya Sen, HDI)
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
          'Nói ngắn gọn, đó là các quyền con người cơ bản. Nhưng những quyền này trông như thế nào trong thực tế?\n\n• Tự do ngôn luận: bạn có thể viết bài chỉ trích chính phủ mà không bị bỏ tù\n• Tự do báo chí: phóng viên có thể điều tra quan chức tham nhũng mà không bị đe dọa\n• Tự do hội họp: bạn có thể tổ chức biểu tình ôn hoà để phản đối chính sách không đồng ý\n• Tự do bầu cử: bạn có thể chọn người đại diện trong số nhiều lựa chọn thực sự cạnh tranh\n• Bình đẳng trước pháp luật: tổng thống phạm tội cũng bị xét xử như người dân thường',
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
        title: 'Case study: Chuyển giao quyền lực — hòa bình hay bạo lực?',
        text: 'Năm 2020–2021 cho thấy hai kết quả trái ngược nhau:\n\n🇺🇸 Mỹ 2020: Biden thắng Trump. Có áp lực lật ngược kết quả, thậm chí xảy ra sự kiện 6/1/2021 (bạo loạn ở Điện Capitol). Nhưng cuối cùng, cơ chế dân chủ vẫn giữ vững — Biden nhậm chức đúng hạn ngày 20/1/2021.\n\n🇲🇲 Myanmar 2021: Đảng dân chủ của bà Aung San Suu Kyi thắng cử vang dội (83% ghế). Quân đội không chấp nhận kết quả, tiến hành đảo chính ngày 1/2/2021, bắt giữ bà Suu Kyi và hàng nghìn người.\n\nSự khác biệt? Một bên có thiết chế dân chủ đủ mạnh để chống đỡ áp lực. Bên kia thì không.',
        variant: 'info',
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
                'Chi phí tổ chức bầu cử toàn quốc rất lớn. Theo OpenSecrets, tổng chi phí toàn bộ bầu cử liên bang Mỹ năm 2020 (tổng thống + quốc hội) lên đến 14.4 tỷ đô la — gấp đôi kỷ lục của chu kỳ 2016. Riêng race tổng thống đã tốn khoảng 5.7 tỷ đô la.',
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
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Dân chủ và phát triển con người',
        description:
          'Mối liên hệ giữa dân chủ, tự do báo chí, và chất lượng cuộc sống — từ lý thuyết đến bằng chứng thực tế',
        category: 'Chính trị học',
        estimatedReadTime: '6 phút',
        documentContent: {
          sections: [
            {
              heading: 'Lập luận của Amartya Sen — Dân chủ ngăn nạn đói',
              paragraphs: [
                'Amartya Sen, nhà kinh tế học người Ấn Độ đoạt giải Nobel Kinh tế 1998, đưa ra một lập luận đáng kinh ngạc: "Chưa bao giờ có một nạn đói lớn nào xảy ra ở bất kỳ quốc gia độc lập, dân chủ nào có tự do báo chí."',
                'Lý do: Nạn đói không chỉ do thiếu lương thực mà còn do thông tin bị bóp méo và thiếu trách nhiệm giải trình. Ở các nước độc tài, quan chức che giấu thảm họa để tránh bị trách phạt. Ở các nước dân chủ, báo chí tự do công bố khủng hoảng ngay lập tức, tạo áp lực chính trị buộc chính phủ phải hành động.',
                'Ví dụ: Nạn đói Trung Quốc 1959–1961 (Great Leap Forward) giết chết 15–55 triệu người — được giữ bí mật với thế giới bên ngoài trong nhiều thập kỷ. Trong khi đó, Ấn Độ — một nền dân chủ còn nghèo hơn Trung Quốc thời đó — không có nạn đói lớn nào sau khi độc lập năm 1947.',
              ],
            },
            {
              heading: 'Tự do báo chí như hệ thống cảnh báo sớm',
              paragraphs: [
                'Báo chí tự do hoạt động như "cảm biến" của xã hội. Khi một con đập sắp vỡ, khi thực phẩm bị ô nhiễm, khi cảnh sát lạm quyền — phóng viên tự do có thể đưa tin ngay. Chính phủ dân chủ, lo sợ mất phiếu bầu ở kỳ bầu cử tới, có động lực giải quyết vấn đề.',
                'Tổ chức Reporters Without Borders (Phóng viên Không Biên giới) công bố Chỉ số Tự do Báo chí hàng năm. Trong DI 2022, hầu hết các nước "full democracy" cũng đứng đầu về tự do báo chí. Không phải ngẫu nhiên: hai chỉ số này tương quan chặt chẽ với nhau.',
              ],
            },
            {
              heading: 'Dân chủ và HDI — Tương quan hay nhân quả?',
              paragraphs: [
                'Human Development Index (HDI — Chỉ số Phát triển Con người) của Liên Hợp Quốc đo lường chất lượng cuộc sống qua 3 chiều: tuổi thọ, giáo dục và thu nhập. Nhìn vào bản đồ HDI: các nước có điểm cao nhất (Na Uy, Thụy Điển, Đan Mạch, Hà Lan) cũng là những nước top "full democracy".',
                'Tuy nhiên, cần lưu ý: tương quan không có nghĩa là nhân quả. Có thể chính sự giàu có và giáo dục tốt tạo điều kiện cho dân chủ (không phải ngược lại). Nghiên cứu học thuật vẫn còn tranh luận về chiều hướng của mối quan hệ này. Điều rõ ràng là: chưa có nước nào trở thành "full democracy" mà lại tồn tại lâu dài trong cảnh nghèo đói và mù chữ — và ngược lại, chưa có nước nào đạt HDI rất cao mà duy trì chế độ độc tài trong dài hạn.',
              ],
            },
          ],
          relatedConcepts: [
            'Freedom of press',
            'Human Development Index',
            'Civil liberties',
            'Accountability',
          ],
          furtherReading: [
            'https://en.wikipedia.org/wiki/Amartya_Sen',
            'https://en.wikipedia.org/wiki/Human_Development_Index',
            'https://en.wikipedia.org/wiki/Freedom_of_the_press',
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — Bạn đã học được gì?',
        text: '✓ Dân chủ đặc biệt vì cho phép thay đổi xã hội mà không cần bạo lực\n✓ Cấp độ cá nhân: tự do ngôn luận, báo chí, hội họp, bầu cử, bình đẳng pháp luật\n✓ Cấp độ cộng đồng: thương lượng hòa bình, chuyển giao quyền lực ổn định\n✓ 3 điều kiện sống chung: bình đẳng, cơ chế quyết định, cơ chế thay đổi\n✓ Amartya Sen: chưa có nạn đói lớn nào xảy ra ở nước dân chủ có báo chí tự do\n✓ Dân chủ là thành tựu hiếm có — chỉ phổ biến trong ~200-300 năm gần đây',
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
          'Podcast nhấn mạnh rằng lợi ích cộng đồng lớn nhất của dân chủ là cho phép thay đổi hòa bình. "Thay vì ném đá vỡ đầu nhau thì giờ chỉ phải ném giấy thôi" — câu này tóm tắt rất hay bản chất của cuộc bầu cử. Đây là lý do tại sao chuyển giao quyền lực hòa bình là một trong những thành tựu quý giá nhất của dân chủ. Case study Mỹ 2020 và Myanmar 2021 cho thấy: thiết chế dân chủ vững chắc hay không quyết định tất cả.',
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
  // v2 additions:
  //   - Body2: Thêm khái niệm Principal-Agent problem
  //   - New library-document: "Brexit 2016 — Bài học về trưng cầu dân ý"
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
          'Theo số liệu từ OpenSecrets, tổng chi phí bầu cử liên bang Mỹ năm 2020 (tổng thống + quốc hội) lên đến 14.4 tỷ đô la — gấp đôi kỷ lục 2016. Riêng cuộc bầu cử tổng thống đã tiêu tốn khoảng 5.7 tỷ đô la. Rõ ràng không thể tổ chức mức đó cho mọi quyết định của nhà nước.',
          'Vì vậy, dân chủ trực tiếp chỉ được áp dụng cho những quyết định quan trọng nhất, ví dụ như bầu nguyên thủ quốc gia, hoặc trưng cầu dân ý lớn như Brexit — Anh rời khỏi Liên minh Châu Âu.',
        ],
      },
      {
        type: 'callout',
        icon: 'warning',
        title: 'Nguy cơ tiềm ẩn của dân chủ trực tiếp',
        text: 'Ngoài chi phí cao, dân chủ trực tiếp còn có những nguy cơ sâu xa hơn:\n\n• Số đông có thể bị thao túng bởi propaganda, tin giả (fake news), misinformation\n• Các nhà lãnh đạo demagogue (mị dân) — người khai thác cảm xúc và nỗi sợ của quần chúng để giành quyền lực thay vì dùng lý lẽ — như Napoleon hay Hitler từng làm điều đó rất thành công\n• Thuật toán mạng xã hội ngày nay tạo ra "bong bóng thông tin" (filter bubble) — cô lập người dùng trong một luồng thông tin một chiều, làm tư duy đa chiều ngày càng khó hơn',
        variant: 'warning',
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Filter bubble là gì? — Bong bóng thông tin hoạt động thế nào',
        text: 'Thuật toán của Facebook, YouTube, TikTok được thiết kế để tối đa hoá thời gian bạn ở trên ứng dụng. Cách hiệu quả nhất? Liên tục cho bạn thấy nội dung bạn đồng ý, nội dung kích thích cảm xúc mạnh (tức giận, sợ hãi, phấn khích).\n\nKết quả:\n→ Người dùng chỉ thấy quan điểm đồng thuận với mình\n→ Quan điểm trái chiều bị lọc ra hoặc bị "tô đậm" thành cực đoan\n→ Mỗi người sống trong một "bong bóng thực tế" khác nhau\n\nĐây là lý do tại sao dân chủ trực tiếp nguy hiểm hơn trong thời đại mạng xã hội: khi cả triệu người ra quyết định dựa trên thông tin bị bóp méo, kết quả bỏ phiếu phản ánh ai kiểm soát thuật toán, không phải ý chí thực sự của người dân.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Dân chủ đại diện — Thực tế hơn, nhưng có rủi ro',
        paragraphs: [
          'Để giải quyết vấn đề chi phí và quy mô, hầu hết các xã hội dân chủ hiện đại áp dụng mô hình đại diện. Mỗi nhóm công dân chọn ra người đại diện — người này được ủy quyền để đưa ra quyết định thay cho cả nhóm.',
          'Trong đời sống hàng ngày, lớp trưởng trong lớp học chính là hình thức sơ khai nhất của dân chủ đại diện. Ở lịch sử Việt Nam, Hội nghị Diên Hồng (1284) là ví dụ nổi tiếng — Thượng Hoàng Trần Thánh Tông triệu tập các bô lão đại diện nhân dân về điện Diên Hồng để hỏi ý kiến: hoà hay chiến với quân Mông Nguyên? Tất cả đồng thanh "Đánh!" — được xem là hội nghị dân chủ đầu tiên trong lịch sử Việt Nam.',
          'Kinh tế học gọi thách thức cốt lõi của mô hình này là "vấn đề người uỷ thác – người đại diện" (Principal-Agent Problem): Người uỷ thác (principal) là cử tri, muốn người đại diện hành động vì lợi ích của mình. Người đại diện (agent) là nghị sĩ/tổng thống, người được trao quyền hành động thay. Vấn đề: agent có thể có lợi ích riêng khác với principal — và do information asymmetry (thông tin bất cân xứng), principal khó biết agent đang làm gì thực sự.',
          'Có hai tình huống xấu có thể xảy ra: (1) Đại diện hiểu nguyện vọng cử tri nhưng biết điều đó không tốt, và chọn không làm theo — giống như cho bọn trẻ tự quyết định hôm nay đi học hay đi chơi. (2) Đại diện hiểu nguyện vọng nhưng vì tham nhũng, lợi ích cá nhân hoặc thiên kiến, bỏ phiếu đi ngược lại.',
          'Giải pháp: dân chủ đại diện thực sự cần các cơ chế kiểm soát — bầu cử định kỳ (nếu agent làm sai, loại ra), minh bạch thông tin (giảm information asymmetry), tư pháp độc lập, và xã hội dân sự mạnh.',
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
                'Hình thức thuần túy nhất từng tồn tại ở Athens cổ đại vào thế kỷ 5 TCN. Có khoảng 40,000–60,000 công dân nam đủ điều kiện tham dự Hội đồng nhân dân (Ecclesia), dù trên thực tế chỉ khoảng 6,000 người thường xuyên tham dự mỗi phiên họp — do khoảng cách địa lý và nghĩa vụ quân sự. Phụ nữ, nô lệ và người nước ngoài không được tham gia.',
              ],
            },
            {
              heading: 'Các hình thức hiện đại',
              paragraphs: [
                'Referendum (trưng cầu dân ý): công dân bỏ phiếu trực tiếp về một vấn đề cụ thể. Ví dụ nổi bật: Brexit ngày 23/6/2016 (51.9% chọn rời EU), hay trưng cầu độc lập Scotland năm 2014 (55.3% chọn ở lại UK).',
                'Initiative (sáng kiến dân chủ): công dân có thể đề xuất luật mới bằng cách thu thập đủ chữ ký. Phổ biến ở một số bang của Mỹ và Thụy Sĩ.',
                'Thụy Sĩ là quốc gia áp dụng dân chủ trực tiếp nhiều nhất thế giới hiện đại: công dân bỏ phiếu khoảng 4 lần/năm, mỗi lần có khoảng 15 vấn đề khác nhau — từ thuế, di dân, luật môi trường đến quan hệ quốc tế. Từ 1900–2020, Thụy Sĩ chiếm hơn 50% tổng số cuộc bỏ phiếu dân chủ trực tiếp cấp quốc gia trên toàn thế giới. Để tổ chức optional referendum cần 50,000 chữ ký; để đề xuất sửa đổi hiến pháp (popular initiative) cần 100,000 chữ ký trong 18 tháng.',
              ],
            },
          ],
          relatedConcepts: ['Representative democracy', 'Referendum', 'Voting systems'],
          furtherReading: [
            'https://en.wikipedia.org/wiki/Direct_democracy',
            'https://en.wikipedia.org/wiki/Voting_in_Switzerland',
          ],
        },
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Brexit 2016 — Khi trưng cầu dân ý thay đổi cục diện châu Âu',
        description:
          'Case study về dân chủ trực tiếp: ưu điểm, rủi ro và bài học từ cuộc bỏ phiếu lịch sử của nước Anh',
        category: 'Chính trị học',
        estimatedReadTime: '7 phút',
        documentContent: {
          sections: [
            {
              heading: 'Bối cảnh — Tại sao Anh lại bỏ phiếu về EU?',
              paragraphs: [
                'Anh gia nhập Cộng đồng Kinh tế Châu Âu (tiền thân của EU) năm 1973. Trong nhiều thập kỷ, một bộ phận dân chúng và chính trị gia Anh luôn hoài nghi về hội nhập châu Âu — lo ngại mất chủ quyền, phải tuân theo luật EU, và vấn đề di dân.',
                'Năm 2013, Thủ tướng David Cameron hứa tổ chức trưng cầu dân ý về tư cách thành viên EU nếu Đảng Bảo thủ thắng bầu cử — một nước cờ chính trị để xoa dịu phe hoài nghi trong đảng. Ông thắng cử năm 2015 và buộc phải giữ lời. Ngày 23/6/2016, 46.5 triệu cử tri Anh đi bỏ phiếu với câu hỏi đơn giản: "Vương quốc Anh có nên ở lại hay rời khỏi Liên minh Châu Âu?"',
              ],
            },
            {
              heading: 'Kết quả và hậu quả',
              paragraphs: [
                'Kết quả: 51.9% chọn "Leave" (rời đi), 48.1% chọn "Remain" (ở lại). Sự khác biệt chỉ là 3.8 điểm phần trăm — khoảng 1.3 triệu phiếu trên tổng số 33.5 triệu phiếu hợp lệ. Cameron từ chức ngay hôm sau.',
                'Hậu quả kéo dài suốt 7 năm: Anh và EU phải đàm phán điều kiện rút lui — một quá trình phức tạp đến mức nhiều chuyên gia pháp lý nói rằng không ai hiểu hết toàn bộ. Anh chính thức rời EU ngày 31/1/2020, nhưng giai đoạn chuyển tiếp kết thúc ngày 31/12/2020. Kể từ đó: thương mại với EU gặp nhiều rào cản hơn, nhiều công ty châu Âu chuyển trụ sở khỏi London, công dân Anh mất quyền tự do đi lại trong EU.',
              ],
            },
            {
              heading: 'Bài học về dân chủ trực tiếp',
              paragraphs: [
                'Brexit là ví dụ hoàn hảo để thấy cả ưu và nhược điểm của direct democracy:\n\nƯu điểm thể hiện: Quyết định có tính hợp pháp cao vì do chính người dân bỏ phiếu. Dù có bất đồng về nội dung, khó ai phủ nhận rằng đây là ý chí của đa số.\n\nNhược điểm thể hiện: (1) Câu hỏi quá đơn giản (Yes/No) cho một vấn đề cực kỳ phức tạp. (2) Nhiều cử tri thừa nhận sau đó rằng họ không hiểu đầy đủ hệ quả — hiện tượng "Bregret" (Brexit regret). (3) Chiến dịch Leave dùng slogan sai sự thật ("350 triệu bảng mỗi tuần cho NHS") — propaganda hiệu quả hơn sự thật phức tạp.',
                'Câu hỏi mà Brexit đặt ra cho toàn thế giới: Liệu người dân có nên trực tiếp quyết định những vấn đề kỹ thuật cực kỳ phức tạp? Hay chỉ nên bầu ra những người đủ chuyên môn để quyết định? Đây chính là câu hỏi cốt lõi của cuộc tranh luận trực tiếp vs đại diện.',
              ],
            },
          ],
          relatedConcepts: [
            'Referendum',
            'Direct democracy',
            'Representative democracy',
            'Political campaign',
          ],
          furtherReading: [
            'https://en.wikipedia.org/wiki/2016_United_Kingdom_European_Union_membership_referendum',
            'https://en.wikipedia.org/wiki/Brexit',
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — So sánh hai mô hình',
        text: 'Dân chủ trực tiếp:\n✓ Phản ánh đúng nhất nguyện vọng cử tri\n✓ Tính hợp pháp cao — người dân trực tiếp quyết định\n✗ Rất tốn kém và khó thực hiện ở quy mô lớn\n✗ Dễ bị thao túng bởi propaganda, demagogue và filter bubble\n✗ Câu hỏi đơn giản cho vấn đề phức tạp (bài học Brexit)\n\nDân chủ đại diện:\n✓ Thực tế hơn — tiết kiệm thời gian và nguồn lực\n✓ Có thể chọn người có chuyên môn để quyết định\n✗ Principal-Agent Problem: đại diện có thể không hành động vì lợi ích cử tri\n✗ Tham nhũng và lợi ích nhóm\n✗ Đòi hỏi cơ chế kiểm soát mạnh (tư pháp độc lập, báo chí tự do)',
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
          'Podcast nhấn mạnh vấn đề chi phí và quy mô: tổng chi phí bầu cử liên bang Mỹ 2020 là $14.4 tỷ đô la, riêng presidential race là $5.7 tỷ. Rõ ràng không thể tổ chức mức chi phí đó cho mọi quyết định. Ngoài ra còn có vấn đề thông tin — với những quyết định phức tạp như Brexit hay chính sách thương mại quốc tế, liệu mọi cử tri có đủ thông tin để ra quyết định đúng? (Câu trả lời đúng là B — đây là bài toán cấu trúc của quy mô và chi phí, không phải về trình độ dân trí.)',
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
  console.log('=== Updating Level 1 content — VERSION 2 (Deep-dive enrichment) ===\n');

  const slugs = ['danchu101-1', 'danchu101-2', 'danchu101-3'];

  for (const slug of slugs) {
    const newContent = updatedLessonContents[slug];
    if (!newContent) continue;

    const lesson = await prisma.lesson.findUnique({ where: { slug } });
    if (!lesson) {
      console.error(`❌ Lesson not found: ${slug}`);
      continue;
    }

    await prisma.lessonContent.upsert({
      where: { lessonId: lesson.id },
      update: {
        title: newContent.title,
        blocks: newContent.blocks as any,
      },
      create: {
        lessonId: lesson.id,
        title: newContent.title,
        blocks: newContent.blocks as any,
      },
    });

    const blockCount = newContent.blocks.length;
    console.log(`✅ Updated: ${slug} — "${newContent.title}" (${blockCount} blocks)`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Level 1 v2 update complete!');
  console.log('='.repeat(60));
  console.log('\nDeep-dive additions:');
  console.log('  Bài 1: "Ba làn sóng dân chủ hoá" Huntington 1974');
  console.log('         New library-doc: EIU methodology (5 tiêu chí, 4 nhóm, Mỹ "flawed")');
  console.log('  Bài 2: Quyền tự do cá nhân mở rộng (5 quyền cụ thể với ví dụ thực tế)');
  console.log('         New library-doc: Dân chủ & Phát triển con người (Amartya Sen, HDI)');
  console.log('  Bài 3: Principal-Agent Problem (người uỷ thác - người đại diện)');
  console.log('         New library-doc: Brexit 2016 case study (bối cảnh, kết quả, bài học)');
}

main()
  .catch((e) => {
    console.error('Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
