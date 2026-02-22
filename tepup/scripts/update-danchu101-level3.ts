/**
 * Update Level 3 content for "Của dân, do dân, vì dân" (dan-chu-101)
 *
 * Changes from fact-check (19/02/2026):
 *   FIXES:
 *   - danchu101-9:  "L'Esprit des lois" → "De l'esprit des lois"
 *   - danchu101-12: Socrates "52%" → "56%" (280/500 phiếu)
 *   - danchu101-12: Tocqueville "nhà xã hội học" → "nhà triết học chính trị và sử gia"
 *   - danchu101-12: Thêm context chuyến đi 1831 — mục đích chính thức là nghiên cứu nhà tù
 *   - danchu101-12: Hoàn chỉnh quote Tocqueville — thêm đoạn kết quan trọng
 *
 *   ENRICHMENT:
 *   - danchu101-9:  Thêm callout Government Shutdown; mở rộng library-doc (cohabitation Pháp, Hungary/Ba Lan)
 *   - danchu101-10: Thêm "50 phòng thí nghiệm" case studies; mở rộng library-doc (Ấn Độ, Brexit, EU sui generis)
 *   - danchu101-11: Thêm callout Nuclear Option; mở rộng library-doc (Nixon Watergate, QPC Pháp)
 *   - danchu101-12: Thêm callout Tyranny of Minority; mở rộng library-doc (Lords Reform, Jim Crow, Bill of Rights)
 *
 * Run: cd tepup && npx tsx scripts/update-danchu101-level3.ts
 */

import 'dotenv/config';
import { prisma } from '../lib/prisma';

const level3Updated: Record<string, { title: string; blocks: any[] }> = {

  // ────────────────────────────────────────────────────────────────
  // LESSON 9: Tam quyền phân lập
  // ────────────────────────────────────────────────────────────────
  'danchu101-9': {
    title: 'Tam quyền phân lập',
    blocks: [
      {
        type: 'text',
        title: 'Trong bài học này bạn sẽ học được gì?',
        paragraphs: [
          'Chúng ta đã giải quyết bài toán đầu tiên của dân chủ: làm thế nào để người dân đưa ra quyết định tập thể (bầu cử). Nhưng ngay cả khi bầu ra được lãnh đạo tốt, vẫn còn bài toán thứ hai: làm thế nào để ngăn chặn bất kỳ ai — dù được bầu lên hoàn toàn hợp pháp — tích tụ quá nhiều quyền lực và trở thành nhà độc tài?',
          'Câu trả lời của khoa học chính trị phương Tây là: phân chia quyền lực. Không trao toàn bộ quyền lực vào tay một người hay một cơ quan — mà chia nó ra, để các nhánh kiểm soát lẫn nhau.',
          'Bài học này khám phá nguyên tắc tam quyền phân lập — phân chia quyền lực nhà nước theo chiều ngang thành 3 nhánh độc lập: lập pháp, hành pháp, và tư pháp.',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Hai bài toán lớn của nền dân chủ',
        text: 'Bài toán 1 (Level 2): Tạo cơ chế đưa ra quyết định tập thể — giải pháp: bầu cử theo nhiệm kỳ thay vì lãnh đạo tại vị đến chết.\n\nBài toán 2 (Level 3): Tạo cân bằng quyền lực — giải pháp: phân chia quyền lực sao cho không nhóm nào có thể thao túng hoàn toàn và hòa bình xã hội bị phá vỡ.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Separation of Powers — Phân lập theo chiều ngang',
        paragraphs: [
          'Separation of powers (phân lập quyền lực) là việc chia quyền lực nhà nước ra thành nhiều nhánh, nhiều cơ quan độc lập nhau. Khi phân chia theo chiều ngang, ta có mô hình quen thuộc nhất: Tam quyền phân lập (Trias Politica).',
          'Quyền lực nhà nước được chia thành 3 nhánh:\n• Lập pháp (Legislative): viết và thông qua luật — ở Mỹ là Quốc hội (Congress)\n• Hành pháp (Executive): điều hành đất nước, thực thi luật — ở Mỹ là Tổng thống\n• Tư pháp (Judicial): giải thích luật và xét xử — ở Mỹ là Tòa án Tối cao',
          'Nhưng mức độ phân lập này thể hiện rất khác nhau giữa các quốc gia. Mỹ, Đức, Pháp cùng có 3 nhánh này — nhưng cách chúng tương tác với nhau hoàn toàn khác nhau.',
        ],
      },
      {
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Trias_Politica_en.svg',
        alt: 'Sơ đồ Trias Politica — tam quyền phân lập: lập pháp, hành pháp, tư pháp',
        caption:
          'Trias Politica — khái niệm tam quyền phân lập được Montesquieu hệ thống hóa trong tác phẩm "The Spirit of the Laws" (De l\'esprit des lois, 1748). Ba nhánh lập pháp, hành pháp, tư pháp tương tác và kiểm soát lẫn nhau. Nguồn: Wikimedia Commons (Public Domain)',
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Ba mô hình khác nhau — Mỹ, Đức, Pháp',
        text: '🇺🇸 Mỹ (Presidential): Tổng thống nắm hành pháp, HOÀN TOÀN độc lập với Quốc hội lập pháp. Cả hai đều do dân bầu trực tiếp (hoặc gián tiếp).\n\n🇩🇪 Đức (Parliamentary): Tổng thống chỉ là nghi lễ. Quốc hội là cơ quan quyền lực tối cao — Thủ tướng do Quốc hội bầu ra và chịu trách nhiệm trước Quốc hội.\n\n🇫🇷 Pháp (Semi-Presidential): Tổng thống mạnh hơn cả — có quyền chọn Thủ tướng và chi phối Chính phủ. Nhưng Quốc hội vẫn có thể bãi miễn Thủ tướng.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Tại sao phân lập quyền lực là cần thiết?',
        paragraphs: [
          'Lịch sử cho thấy: khi một người hay một nhóm nắm giữ cả 3 quyền — làm luật, thực thi luật, và xét xử — hậu quả thường là độc tài. Người nắm luật tự đặt ra luật có lợi cho mình, tự thực thi theo ý mình, và tự xét xử các kẻ thách thức mình.',
          'Montesquieu — nhà triết học Pháp thế kỷ 18 — là người hệ thống hóa nguyên tắc tam quyền phân lập trong tác phẩm "The Spirit of the Laws" (De l\'esprit des lois, 1748). Ông quan sát rằng: "Khi quyền lập pháp và hành pháp hợp nhất trong cùng một người hay cùng một cơ quan... sẽ không có tự do."',
          'Các founding fathers của Mỹ đã đọc Montesquieu rất kỹ khi viết Hiến pháp 1787 — và thiết kế hệ thống phân quyền mạnh mẽ nhất thế giới lúc bấy giờ, với 3 nhánh độc lập nhau, giám sát lẫn nhau.',
        ],
      },
      {
        type: 'callout',
        icon: 'warning',
        title: 'Khi tam quyền phân lập bị xói mòn — Bài học từ Hungary và Ba Lan',
        text: 'Phân lập quyền lực trên giấy tờ không đủ — cần có ý chí chính trị thực sự để duy trì nó.\n\n🇭🇺 Hungary: Từ 2010, Thủ tướng Orbán (Fidesz) dùng đa số 2/3 trong Quốc hội để sửa Hiến pháp, bổ nhiệm thẩm phán thân cận vào Tòa án Hiến pháp, mở rộng số ghế từ 11 lên 15 để kiểm soát đa số. EU đã khởi xướng thủ tục Article 7 năm 2018.\n\n🇵🇱 Ba Lan: Đảng PiS (2015–2023) cải tổ Tòa án Tối cao và Tòa án Hiến pháp theo hướng ủng hộ đảng cầm quyền. Đây là hai ví dụ điển hình về "autocratization" — dần dần phá vỡ checks and balances từ bên trong, qua các phương tiện hợp pháp.',
        variant: 'warning',
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Montesquieu và lý thuyết tam quyền phân lập',
        description: 'Từ "De l\'esprit des lois" đến Hiến pháp Mỹ — hành trình của một ý tưởng thay đổi thế giới',
        category: 'Chính trị học',
        estimatedReadTime: '6 phút',
        documentContent: {
          sections: [
            {
              heading: 'Montesquieu — Người đặt nền móng lý thuyết',
              paragraphs: [
                'Charles-Louis de Secondat, Baron de Montesquieu (1689–1755), nhà triết học chính trị và luật học người Pháp, là người đầu tiên hệ thống hóa nguyên tắc tam quyền phân lập thành lý thuyết chính trị trong "De l\'esprit des lois" (The Spirit of the Laws, 1748).',
                'Ông quan sát hệ thống chính trị Anh — nơi Nghị viện đã dần giành được quyền lực từ tay nhà vua — và kết luận rằng tự do chỉ tồn tại khi quyền lực bị giới hạn bởi quyền lực khác.',
              ],
            },
            {
              heading: 'Ảnh hưởng đến Hiến pháp Mỹ',
              paragraphs: [
                'Các founding fathers của Mỹ — James Madison, Alexander Hamilton, John Jay — đã trích dẫn Montesquieu nhiều lần trong "The Federalist Papers" (1787–1788), bộ tài liệu giải thích và bảo vệ dự thảo Hiến pháp Mỹ.',
                'Madison viết trong Federalist No. 47: "Sự tích lũy tất cả các quyền — lập pháp, hành pháp, tư pháp — vào tay cùng một người, hay cùng một cơ quan... chính xác là định nghĩa của chính quyền chuyên quyền."',
              ],
            },
            {
              heading: 'Cohabitation — Stress test của hệ thống Semi-Presidential',
              paragraphs: [
                'Một trong những thử thách thú vị nhất của mô hình Pháp là "cohabitation" — khi Tổng thống và Thủ tướng thuộc hai đảng đối lập. Pháp đã trải qua ba lần cohabitation: 1986–1988 (Mitterrand + Chirac), 1993–1995 (Mitterrand + Balladur), 1997–2002 (Chirac + Jospin).',
                'Điều đáng chú ý: cả ba lần, hệ thống đều hoạt động được — dù căng thẳng. Đây là bằng chứng cho thấy phân quyền trong hiến pháp có thể tạo ra sự cân bằng ngay cả khi hai bên đối lập. Tuy nhiên, cải cách năm 2000 rút ngắn nhiệm kỳ Tổng thống từ 7 xuống 5 năm đã giảm đáng kể khả năng xảy ra cohabitation.',
              ],
            },
            {
              heading: 'Các mô hình phân quyền hiện đại — So sánh',
              paragraphs: [
                'Presidential system (Mỹ): hành pháp và lập pháp do dân bầu độc lập, kiểm soát nhau. Ưu: hành pháp mạnh và ổn định. Nhược: dễ dẫn đến gridlock khi 2 nhánh đối lập — Mỹ đã trải qua 21 lần government shutdown từ 1976 đến 2019.',
                'Parliamentary system (Anh, Đức): hành pháp (thủ tướng + nội các) xuất phát từ đa số lập pháp, chịu trách nhiệm trước quốc hội. Ưu: ít gridlock hơn. Nhược: hành pháp có thể bị lật đổ bởi quốc hội bất cứ lúc nào — Ý là ví dụ điển hình với 70+ chính phủ từ 1945 đến nay.',
              ],
            },
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — Bạn đã nắm được gì?',
        text: '✓ Bài toán 2 của dân chủ: cân bằng quyền lực để không ai độc quyền kiểm soát\n✓ Separation of powers: phân chia quyền lực thành nhiều nhánh độc lập\n✓ Chiều ngang: tam quyền phân lập — lập pháp, hành pháp, tư pháp\n✓ Mỹ: presidential — 3 nhánh độc lập hoàn toàn\n✓ Đức: parliamentary — tổng thống là nghi lễ, thủ tướng do quốc hội bầu\n✓ Pháp: semi-presidential — tổng thống mạnh, quốc hội vẫn giám sát thủ tướng\n✓ Cảnh báo: phân quyền trên giấy không đủ — Hungary và Ba Lan là ví dụ về xói mòn từ bên trong',
        variant: 'success',
      },
      {
        type: 'question',
        question: 'Điểm khác biệt chính giữa hệ thống "presidential" (Mỹ) và "parliamentary" (Đức) là gì?',
        options: [
          { text: 'Mỹ không có quốc hội, Đức có', isCorrect: false },
          {
            text: 'Ở Mỹ hành pháp độc lập với lập pháp; ở Đức thủ tướng do quốc hội bầu và chịu trách nhiệm trước quốc hội',
            isCorrect: true,
          },
          { text: 'Ở Đức không có tư pháp độc lập', isCorrect: false },
          { text: 'Ở Mỹ tổng thống chỉ là chức vụ nghi lễ', isCorrect: false },
        ],
        explanation:
          'Trong hệ thống presidential (Mỹ), hành pháp (tổng thống) và lập pháp (quốc hội) đều do dân bầu độc lập — tổng thống không phụ thuộc vào đa số quốc hội. Trong parliamentary (Đức), thủ tướng do quốc hội bầu ra và chịu trách nhiệm trước quốc hội — quốc hội có thể bãi miễn thủ tướng bất cứ lúc nào.',
      },
      {
        type: 'text',
        title: 'Tổng kết — Và bài học tiếp theo',
        paragraphs: [
          'Tam quyền phân lập — phân chia theo chiều ngang — là một trong những phát minh vĩ đại nhất của khoa học chính trị. Nhưng phân chia theo chiều ngang chỉ là một chiều. Còn một chiều khác: phân quyền theo chiều dọc — giữa chính quyền trung ương và địa phương.',
          'Bài học tiếp theo sẽ khám phá hệ thống liên bang (federalism) — cách các nước lớn phân chia quyền lực giữa chính phủ trung ương và các bang, tỉnh, địa phương. Và tại sao cả hệ thống liên bang cũng có những đánh đổi riêng.',
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // LESSON 10: Liên bang & Phân quyền địa phương
  // ────────────────────────────────────────────────────────────────
  'danchu101-10': {
    title: 'Liên bang & Phân quyền địa phương',
    blocks: [
      {
        type: 'text',
        title: 'Trong bài học này bạn sẽ học được gì?',
        paragraphs: [
          'Tam quyền phân lập chia quyền lực theo chiều ngang — giữa 3 nhánh nhà nước. Nhưng trong một quốc gia rộng lớn, đa dạng về văn hóa và địa lý, còn cần phân chia theo chiều dọc: giữa chính quyền trung ương và chính quyền địa phương.',
          'Bài học này khám phá hệ thống liên bang (federalism) — một trong những phát minh thể chế quan trọng nhất của nước Mỹ, được nhiều quốc gia lớn trên thế giới học tập. Cùng với đó là những ưu điểm và nhược điểm mà hệ thống này mang lại.',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Hai chiều phân quyền',
        text: 'Chiều ngang (horizontal): phân chia quyền lực giữa các nhánh nhà nước — lập pháp, hành pháp, tư pháp (bài trước)\n\nChiều dọc (vertical): phân chia quyền lực giữa các cấp chính quyền — trung ương và địa phương (bài này)',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Federalism — Hệ thống liên bang là gì?',
        paragraphs: [
          'Trong hệ thống liên bang, đất nước được tổ chức thành các đơn vị địa phương (bang, tỉnh, tiểu quốc) — mỗi đơn vị có hệ thống pháp luật và chính quyền riêng. Chính phủ liên bang (trung ương) và chính quyền địa phương tồn tại song song, mỗi bên có phạm vi thẩm quyền riêng.',
          'Mỹ là ví dụ điển hình nhất: trước khi thành lập liên bang Mỹ năm 1789, mỗi tiểu bang vốn là một "tiểu quốc gia" độc lập. Khi họ quyết định liên kết với nhau, họ không muốn từ bỏ hoàn toàn quyền tự trị — vì vậy hệ thống liên bang ra đời như một sự thỏa hiệp: có chính phủ trung ương chung, nhưng các bang vẫn giữ nhiều quyền tự quyết.',
          'Ngoài Mỹ, các nước liên bang tiêu biểu gồm: Đức, Ấn Độ, Brazil, Úc, Canada, Thụy Sĩ. Đây thường là những nước lớn, đa sắc tộc, đa tôn giáo hoặc đa ngôn ngữ.',
        ],
      },
      {
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Map_of_unitary_and_federal_states.svg',
        alt: 'Bản đồ thế giới phân biệt nhà nước liên bang (xanh) và nhà nước đơn nhất (cam/vàng)',
        caption:
          'Bản đồ các nhà nước liên bang (xanh lam) và nhà nước đơn nhất (cam) trên thế giới. Các nước liên bang thường là nước lớn với đa dạng sắc tộc, ngôn ngữ và địa lý. Nguồn: Wikimedia Commons (CC BY-SA)',
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Ưu điểm và nhược điểm của hệ thống liên bang',
        text: '✅ Ưu điểm:\n• Chính sách phù hợp với nhu cầu địa phương hơn — "nước xa không cứu được lửa gần"\n• Chính quyền địa phương hiểu và có trách nhiệm trực tiếp với người dân địa phương\n• Các bang có thể "thử nghiệm" chính sách mới trước khi áp dụng toàn quốc\n• Quyền lực không tập trung quá mức vào trung ương\n\n⚠️ Nhược điểm:\n• Thiếu nhất quán giữa các địa phương — người dân di chuyển phải hiểu luật khác nhau\n• Hệ thống phức tạp, chi phí hành chính cao\n• Khó đạt đồng thuận quốc gia về các vấn đề lớn\n• Nguy cơ mâu thuẫn giữa luật liên bang và luật bang',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Phân quyền theo chiều dọc: từ địa phương lên quốc tế',
        paragraphs: [
          'Phân quyền theo chiều dọc không chỉ diễn ra từ trung ương xuống địa phương — mà còn có thể diễn ra theo hướng ngược lại: từ quốc gia lên các tổ chức siêu quốc gia.',
          'Liên minh Châu Âu (EU) là ví dụ nổi bật: các nước thành viên tự nguyện chuyển giao một phần quyền lực quốc gia cho EU — về chính sách thương mại, tiền tệ (Eurozone), và nhiều lĩnh vực khác. EU được mô tả là "sui generis" — một dạng hội nhập độc đáo, không hoàn toàn là liên bang (thiếu quân đội chung, ngân sách chung hạn chế) nhưng vượt xa liên minh quốc tế thông thường.',
          'Câu hỏi đặt ra là: đến đâu thì phù hợp? Quá tập trung ở trung ương → thiếu linh hoạt, xa rời thực tế địa phương. Quá phân tán → thiếu nhất quán, khó phối hợp khi cần hành động tập thể (như đại dịch, biến đổi khí hậu). Brexit năm 2020 là ví dụ cụ thể về việc một quốc gia quyết định lấy lại quyền lực đã nhượng — điều gần như không thể xảy ra trong liên bang thực sự.',
        ],
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Federalism — Lý thuyết và thực tiễn',
        description: 'Phân tích các mô hình liên bang trên thế giới — từ "50 phòng thí nghiệm" ở Mỹ đến liên bang bất đối xứng ở Ấn Độ',
        category: 'Chính trị học',
        estimatedReadTime: '7 phút',
        documentContent: {
          sections: [
            {
              heading: 'Lịch sử hệ thống liên bang',
              paragraphs: [
                'Hệ thống liên bang hiện đại bắt nguồn từ sự ra đời của Hoa Kỳ năm 1789. Hiến pháp Mỹ là văn bản đầu tiên trên thế giới thiết lập một chính phủ liên bang với phân quyền rõ ràng giữa trung ương và địa phương.',
                'The Federalist Papers (1787–1788) — do Madison, Hamilton và Jay viết — là bộ tài liệu lý luận sâu sắc nhất về lý thuyết liên bang, vẫn được nghiên cứu đến ngày nay.',
              ],
            },
            {
              heading: 'Subsidiarity — Nguyên tắc nền tảng',
              paragraphs: [
                'Nguyên tắc subsidiarity (tính phụ trợ) cho rằng: quyết định nên được đưa ra ở cấp thấp nhất có thể xử lý hiệu quả vấn đề đó. Chính phủ trung ương chỉ can thiệp khi địa phương không đủ khả năng.',
                'EU áp dụng nguyên tắc này: Brussels (EU) chỉ can thiệp vào những vấn đề mà các nước thành viên không thể tự giải quyết hiệu quả riêng lẻ — như chính sách cạnh tranh, thương mại quốc tế, hay ứng phó đại dịch.',
              ],
            },
            {
              heading: '"50 phòng thí nghiệm dân chủ" — Sức mạnh thực nghiệm của liên bang Mỹ',
              paragraphs: [
                'Một trong những lợi ích ít được nhắc đến nhất của liên bang là khả năng "thử nghiệm chính sách" ở cấp bang trước khi áp dụng toàn quốc. Thẩm phán Louis Brandeis từng gọi các bang Mỹ là "những phòng thí nghiệm của nền dân chủ".',
                'Hai ví dụ điển hình: Massachusetts năm 2006 thực hiện bảo hiểm y tế gần-toàn-dân (RomneyCare) — trở thành mô hình cho Affordable Care Act (Obamacare) năm 2010. Colorado và Washington năm 2012 là hai bang đầu tiên hợp pháp hóa cần sa giải trí — đến 2024 đã có 24 bang theo sau. Chính sách thí nghiệm ở bang nhỏ, nếu thành công mới lan rộng.',
              ],
            },
            {
              heading: 'Ấn Độ — Liên bang với quyền trung ương mạnh bất thường',
              paragraphs: [
                'Ấn Độ là liên bang nhưng với một điểm bất thường: Hiến pháp 1950 cho phép chính phủ trung ương áp đặt "President\'s Rule" — trực tiếp quản lý một bang nếu chính quyền bang "sụp đổ". Quyền này đã được sử dụng hơn 130 lần từ 1950 đến nay — thường vì lý do chính trị hơn là khủng hoảng thực sự.',
                'Đây là ví dụ cho thấy liên bang trong thực tế có phổ rộng hơn nhiều so với mô hình lý tưởng kiểu Mỹ. Liên bang "bất đối xứng" như Ấn Độ, Tây Ban Nha (Catalonia có đặc quyền lớn) hay Canada (Quebec có đặc quyền ngôn ngữ) là phổ biến hơn so với liên bang đối xứng hoàn hảo.',
              ],
            },
            {
              heading: 'Liên bang và các quyền thiểu số — Hai mặt',
              paragraphs: [
                'Một trong những lợi ích của hệ thống liên bang là khả năng bảo vệ quyền của các nhóm thiểu số khu vực. Ví dụ: Quebec (Canada) có đặc quyền sử dụng tiếng Pháp như ngôn ngữ chính thức, dù phần còn lại của Canada dùng tiếng Anh.',
                'Tuy nhiên, hệ thống liên bang cũng có thể bị lạm dụng để che giấu sự phân biệt đối xử: các bang miền Nam nước Mỹ từng dùng quyền "tự trị" bang để duy trì chế độ Jim Crow (phân biệt chủng tọc) suốt 1877–1964, cho đến khi Đạo luật Dân quyền 1964 của liên bang can thiệp. Liên bang là công cụ — kết quả tốt hay xấu phụ thuộc vào ai sử dụng nó.',
              ],
            },
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — Bạn đã nắm được gì?',
        text: '✓ Federalism: phân quyền theo chiều dọc — trung ương vs địa phương\n✓ Mỹ: mô hình liên bang đầu tiên — ra đời từ 13 thuộc địa tự trị muốn hợp nhất nhưng giữ quyền tự trị\n✓ Ưu: chính sách phù hợp địa phương, "50 phòng thí nghiệm" thử nghiệm chính sách\n✓ Nhược: thiếu nhất quán, phức tạp, khó phối hợp khi cần\n✓ EU: sui generis — không phải liên bang hoàn toàn, nhưng hội nhập sâu hơn liên minh thông thường; Brexit cho thấy khác biệt so với liên bang thực sự\n✓ Liên bang là công cụ: có thể bảo vệ thiểu số (Quebec) nhưng cũng có thể bị lạm dụng (Jim Crow)',
        variant: 'success',
      },
      {
        type: 'question',
        question: 'Tại sao hệ thống liên bang thường được chọn bởi các nước lớn, đa dạng sắc tộc và ngôn ngữ?',
        options: [
          { text: 'Vì liên bang là hệ thống rẻ hơn và đơn giản hơn để vận hành', isCorrect: false },
          {
            text: 'Vì nó cho phép chính sách phù hợp với từng địa phương, đồng thời bảo vệ quyền tự trị của các cộng đồng khác nhau',
            isCorrect: true,
          },
          { text: 'Vì liên bang loại bỏ hoàn toàn xung đột giữa các nhóm trong xã hội', isCorrect: false },
          { text: 'Vì chính phủ trung ương trong hệ thống liên bang có quyền lực tuyệt đối', isCorrect: false },
        ],
        explanation:
          'Các nước đa dạng thường có các cộng đồng với nhu cầu, văn hóa, và ngôn ngữ khác nhau. Hệ thống liên bang cho phép các cộng đồng này tự quản lý phần lớn công việc của mình, trong khi vẫn có chính phủ trung ương để xử lý các vấn đề chung. Đây là sự cân bằng giữa thống nhất và đa dạng.',
      },
      {
        type: 'text',
        title: 'Tổng kết — Và bài học tiếp theo',
        paragraphs: [
          'Chúng ta đã hiểu cả hai chiều phân quyền: theo chiều ngang (tam quyền phân lập) và theo chiều dọc (liên bang). Nhưng phân quyền chỉ có ý nghĩa khi có cơ chế để các nhánh thực sự kiểm soát lẫn nhau.',
          'Bài học tiếp theo khám phá "linh hồn" của hệ thống phân quyền: Checks and Balances — cơ chế kiểm soát và đối trọng. Làm thế nào Tổng thống, Quốc hội, và Tòa án Tối cao của Mỹ liên tục "kéo co" với nhau để đảm bảo không ai có quyền lực tuyệt đối?',
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // LESSON 11: Kiểm soát & Đối trọng (Checks and Balances)
  // ────────────────────────────────────────────────────────────────
  'danchu101-11': {
    title: 'Kiểm soát & Đối trọng (Checks and Balances)',
    blocks: [
      {
        type: 'text',
        title: 'Trong bài học này bạn sẽ học được gì?',
        paragraphs: [
          '"Check" có nghĩa là kiểm tra. "Balance" có nghĩa là cân bằng. Checks and Balances là cơ chế trong đó các nhánh quyền lực giám sát lẫn nhau để ngăn chặn bất kỳ nhánh nào tích lũy quá nhiều quyền lực.',
          'Nếu tam quyền phân lập là "bản thiết kế" — thì checks and balances là "cơ chế vận hành". Bài học này đi vào chi tiết: ở Mỹ, Tổng thống, Quốc hội, và Tòa án Tối cao kiểm soát lẫn nhau như thế nào? Và tại sao cơ chế này — dù phức tạp và đôi khi gây tắc nghẽn — lại được coi là thành tựu vĩ đại của thể chế dân chủ?',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Checks and Balances — Ý tưởng cốt lõi',
        text: '"Tham vọng phải được dùng để đối trọng lại tham vọng." — James Madison, Federalist No. 51\n\nCác nhà lập quốc Mỹ không tin vào lòng tốt của con người. Thay vào đó, họ thiết kế một hệ thống trong đó lợi ích của mỗi nhánh quyền lực mâu thuẫn với nhau — buộc chúng phải liên tục kiểm soát lẫn nhau.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Hệ thống kiểm soát đối trọng của Mỹ — Chi tiết',
        paragraphs: [
          'Nhánh Hành pháp — Tổng thống:\n• Điều hành quốc gia, thực thi luật\n• Đề cử thẩm phán Tòa án Tối cao và các quan chức cấp cao\n• Có quyền phủ quyết (veto) các dự luật của Quốc hội\n• Bị Quốc hội giám sát — có thể bị phế truất (impeachment)',
          'Nhánh Lập pháp — Quốc hội (Congress):\n• Viết và thông qua luật\n• Phê chuẩn (hoặc từ chối) nhân sự do Tổng thống đề cử\n• Quyết định ngân sách hoạt động của chính phủ\n• Có thể vượt qua veto của Tổng thống nếu 2/3 đồng ý\n• Có quyền phế truất Tổng thống (impeachment)',
          'Nhánh Tư pháp — Tòa án Tối cao (Supreme Court):\n• Thẩm phán được chỉ định chung thân — không phụ thuộc vào bất kỳ tổng thống nào\n• Quyền "judicial review": xem xét và tuyên bố luật/hành động của hành pháp hay lập pháp là vi hiến\n• Là "trọng tài" giải thích Hiến pháp',
        ],
      },
      {
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Checks_and_Balances.svg',
        alt: 'Sơ đồ checks and balances của Mỹ — 3 nhánh quyền lực kiểm soát lẫn nhau',
        caption:
          'Sơ đồ hệ thống kiểm soát và đối trọng (Checks and Balances) của Hoa Kỳ. Mũi tên thể hiện cơ chế kiểm soát giữa 3 nhánh: hành pháp (executive), lập pháp (legislative), tư pháp (judicial). Nguồn: Wikimedia Commons (Public Domain)',
      },
      {
        type: 'callout',
        icon: 'warning',
        title: 'Ví dụ thực tế: Vòng lặp kiểm soát',
        text: 'Tổng thống đề cử thẩm phán Tòa án Tối cao\n→ Quốc hội phê chuẩn (hoặc từ chối)\n→ Thẩm phán được chỉ định chung thân, có thể tuyên bố lệnh của Tổng thống là vi hiến\n→ Tổng thống phải tuân thủ phán quyết của Tòa án\n\nKết quả: Tổng thống bổ nhiệm người vào cơ quan có quyền phán xét chính Tổng thống — đây là vòng lặp kiểm soát tinh tế mà các founding fathers đã thiết kế.',
        variant: 'warning',
      },
      {
        type: 'text',
        title: 'Judicial Review — Vũ khí bí mật của tư pháp',
        paragraphs: [
          'Một trong những cơ chế checks and balances quan trọng nhất — và ít được biết đến nhất — là judicial review (tư pháp kiểm hiến). Đây là quyền của Tòa án Tối cao xem xét và tuyên bố vô hiệu bất kỳ luật hay hành động của hành pháp nào vi phạm Hiến pháp.',
          'Điều thú vị: judicial review không được ghi trong Hiến pháp Mỹ. Nó được thiết lập qua phán quyết "Marbury v. Madison" năm 1803 — trong đó Chánh án John Marshall tuyên bố rằng: nếu Hiến pháp là luật tối cao, thì tòa án phải có quyền phán xét các luật khác có hợp Hiến hay không.',
          'Từ đó, judicial review trở thành một trong những quyền lực mạnh mẽ nhất của tư pháp — và được nhiều nước khác học tập. Đức có Bundesverfassungsgericht (Tòa án Hiến pháp Liên bang), Pháp có Conseil Constitutionnel — đây đều là các cơ quan thực hiện judicial review.',
        ],
      },
      {
        type: 'callout',
        icon: 'warning',
        title: '"Nuclear Option" — Khi quy tắc checks and balances bị sửa đổi',
        text: 'Checks and balances không chỉ có thể bị phá vỡ từ bên ngoài — mà còn có thể bị thay đổi bởi chính các bên trong hệ thống.\n\nFilibuster từng là quy tắc bất thành văn bảo vệ thiểu số Thượng viện. Năm 2013, đảng Dân chủ (do Reid lãnh đạo) dùng "nuclear option" — bỏ phiếu thay đổi quy tắc bằng đa số đơn giản — để hạ ngưỡng cloture với nominations từ 60 xuống đa số. Năm 2017, đảng Cộng hòa (McConnell) mở rộng sang cả Thẩm phán Tòa án Tối cao.\n\nBài học: rules của checks and balances có thể bị chính các tác nhân mà nó kiểm soát sửa đổi — đây là lỗ hổng cấu trúc trong mọi hệ thống thể chế.',
        variant: 'warning',
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Checks and Balances trong thực tiễn',
        description: 'Các trường hợp lịch sử khi checks and balances hoạt động — và khi chúng bị thách thức',
        category: 'Chính trị học',
        estimatedReadTime: '6 phút',
        documentContent: {
          sections: [
            {
              heading: 'Watergate (1972–1974) — Checks and Balances hoạt động hoàn hảo',
              paragraphs: [
                'Vụ Watergate là ví dụ giáo khoa lý tưởng nhất về checks and balances: Tổng thống Nixon cố ý che đậy vụ đột nhập trụ sở đảng Dân chủ. Quốc hội điều tra và bắt đầu thủ tục impeachment. Tòa án Tối cao ra lệnh Nixon phải nộp băng ghi âm (United States v. Nixon, 1974). Nixon từ chức ngày 9/8/1974 — trước khi bị phế truất.',
                'Điều đáng chú ý: ba nhánh đều hoạt động độc lập. Tòa án không "bảo vệ" tổng thống dù ông đã bổ nhiệm nhiều thẩm phán. Đây là minh chứng mạnh mẽ nhất trong lịch sử Mỹ rằng hệ thống có thể tự điều chỉnh.',
              ],
            },
            {
              heading: 'DACA (2020): Tư pháp kiểm soát hành pháp',
              paragraphs: [
                'Vụ DHS v. Regents of the University of California (2020): Tòa án Tối cao phán quyết 5–4 (Chánh án Roberts viết đa số) rằng cách bãi bỏ DACA của chính quyền Trump là "arbitrary and capricious" — vi phạm Administrative Procedure Act (APA).',
                'Tòa không phán xét DACA là đúng hay sai về chính sách — mà chỉ yêu cầu hành pháp phải tuân thủ đúng quy trình hành chính. Đây là tư pháp kiểm soát hành pháp theo đúng cơ chế checks and balances.',
              ],
            },
            {
              heading: 'Judicial review ngoài nước Mỹ — Pháp và sự thay đổi năm 2010',
              paragraphs: [
                'Đức: Bundesverfassungsgericht (BVerfG, thành lập 1951) là một trong những tòa án hiến pháp có ảnh hưởng nhất thế giới. Tòa này đã từng phán quyết rằng nhiều luật của Quốc hội Đức là vi hiến, bao gồm một số điều khoản liên quan đến tích hợp EU.',
                'Pháp: Conseil Constitutionnel truyền thống kiểm tra luật TRƯỚC khi có hiệu lực (a priori review). Tuy nhiên từ năm 2010, cải cách hiến pháp bổ sung cơ chế Question Prioritaire de Constitutionnalité (QPC) — cho phép xét sau khi luật đã áp dụng trong quá trình tố tụng (a posteriori). Pháp hiện có cả hai cơ chế, tạo thành hệ thống hybrid.',
              ],
            },
            {
              heading: 'Senate Polarization và Gridlock — Chi phí của checks and balances',
              paragraphs: [
                'Khi 2 đảng không thể hợp tác, checks and balances có thể dẫn đến "gridlock" (tắc nghẽn) — không luật nào được thông qua, ngân sách bị đình trệ. Mỹ đã trải qua 21 lần government shutdown từ 1976, dài nhất là 35 ngày (tháng 12/2018 – tháng 1/2019) khi Trump và Hạ viện do Pelosi lãnh đạo bất đồng về tường biên giới.',
                'Government shutdown không phải "lỗi hệ thống" — mà là hệ quả có thể dự đoán của hệ thống phân quyền mạnh trong bối cảnh phân cực chính trị. Đây là đánh đổi quan trọng cần hiểu: checks and balances bảo vệ chúng ta khỏi tập trung quyền lực, nhưng chi phí là đôi khi không ai có đủ quyền lực để ra quyết định cần thiết.',
              ],
            },
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — Bạn đã nắm được gì?',
        text: '✓ Checks and balances: các nhánh quyền lực giám sát lẫn nhau để không ai có quyền tuyệt đối\n✓ Hành pháp: điều hành, veto luật, đề cử thẩm phán\n✓ Lập pháp: phê chuẩn nhân sự, quyết định ngân sách, có thể phế truất tổng thống\n✓ Tư pháp: thẩm phán chung thân, judicial review — tuyên bố luật/hành động vi hiến\n✓ Judicial review xuất phát từ Marbury v. Madison (1803), không ghi trong Hiến pháp\n✓ Watergate 1974: Nixon từ chức trước khi bị phế truất — hệ thống hoạt động hoàn hảo\n✓ "Nuclear Option": chính các bên trong hệ thống có thể sửa đổi rules — đây là lỗ hổng cấu trúc\n✓ Gridlock là chi phí không thể tránh của checks and balances trong bối cảnh phân cực',
        variant: 'success',
      },
      {
        type: 'question',
        question: 'Điều nào sau đây là ví dụ đúng về "checks and balances" trong hệ thống Mỹ?',
        options: [
          { text: 'Tổng thống bổ nhiệm thống đốc các bang', isCorrect: false },
          {
            text: 'Tòa án Tối cao tuyên bố một đạo luật của Quốc hội là vi hiến',
            isCorrect: true,
          },
          { text: 'Quốc hội bầu ra Tổng thống trong trường hợp thông thường', isCorrect: false },
          { text: 'Tổng thống có quyền giải tán Quốc hội bất cứ lúc nào', isCorrect: false },
        ],
        explanation:
          'Judicial review — quyền Tòa án Tối cao tuyên bố luật vi hiến — là một trong những ví dụ điển hình nhất của checks and balances: nhánh tư pháp kiểm soát nhánh lập pháp. Tổng thống Mỹ không có quyền bổ nhiệm thống đốc bang (bang bầu riêng) và không thể giải tán Quốc hội; Quốc hội cũng không bầu tổng thống trong điều kiện thông thường.',
      },
      {
        type: 'text',
        title: 'Tổng kết — Và bài học tiếp theo',
        paragraphs: [
          'Checks and balances là "linh hồn" của hệ thống phân quyền. Nó phức tạp, đôi khi gây tắc nghẽn, đôi khi bị thách thức — nhưng lịch sử hơn 230 năm của nước Mỹ cho thấy: đây là một hệ thống đủ bền vững để vượt qua nhiều khủng hoảng, kể cả Watergate.',
          'Bài học cuối Level 3 sẽ khám phá một công cụ kiểm soát quan trọng khác: nghị viện lưỡng viện (bicameralism). Tại sao lại cần đến 2 viện trong quốc hội? Và quan trọng hơn: đây còn là câu chuyện về "tyranny of the majority" (chuyên chế của đa số) — một trong những mối nguy hiểm ít được nhắc đến nhất của nền dân chủ.',
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // LESSON 12: Nghị viện lưỡng viện & Bảo vệ thiểu số
  // ────────────────────────────────────────────────────────────────
  'danchu101-12': {
    title: 'Nghị viện lưỡng viện & Bảo vệ thiểu số',
    blocks: [
      {
        type: 'text',
        title: 'Trong bài học này bạn sẽ học được gì?',
        paragraphs: [
          'Nếu tam quyền phân lập bảo vệ chúng ta khỏi nhà nước toàn trị, thì còn ai bảo vệ chúng ta khỏi... chính người dân? Đây chính là câu hỏi mà nhà triết học chính trị Alexis de Tocqueville đặt ra trong tác phẩm kinh điển "Democracy in America" (1835): "Tyranny of the majority" — chuyên chế của đa số.',
          'Bài học này khám phá lưỡng viện (bicameralism) — hệ thống có 2 viện trong quốc hội, một phát minh thể chế quan trọng để làm chậm quá trình lập pháp và bảo vệ các nhóm thiểu số khỏi bị đa số áp đặt. Đồng thời, chúng ta sẽ tìm hiểu tại sao dân chủ cần hơn cả luật lệ: nó cần những công dân có tư duy độc lập.',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Hai hệ thống nghị viện',
        text: '🏛 Unicameral (đơn viện): chỉ có 1 viện duy nhất trong quốc hội. Phổ biến ở các nước nhỏ và đồng nhất hơn. Ví dụ: Thụy Điển, Đan Mạch, Singapore, New Zealand (unicameral từ 1950).\n\n🏛🏛 Bicameral (lưỡng viện): có 2 viện — thường là hạ viện (lower house) và thượng viện (upper house). Phổ biến ở các nước lớn và liên bang. Ví dụ: Mỹ, Đức, Pháp, Anh, Nhật Bản.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Lịch sử lưỡng viện — Từ quý tộc đến bang nhỏ',
        paragraphs: [
          'Lưỡng viện ban đầu ra đời để đại diện cho các giai cấp khác nhau trong xã hội. Quốc hội Anh là ví dụ điển hình đầu tiên: House of Lords (Thượng viện) dành cho giới quý tộc và giới tăng lữ; House of Commons (Hạ viện) dành cho thường dân.',
          'Ở Mỹ, lý do khác. James Madison — một trong những founding fathers — lo ngại "mob rule": đám đông người nghèo có thể dùng quyền lực chính trị để đòi chia lại tài sản của những người giàu. Ông muốn Thượng viện là nơi tập trung những người "sáng suốt và giàu có hơn", có thể đưa ra quyết định bình tĩnh hơn.',
          'Theo thời gian, quan điểm đó thay đổi — Thượng viện không còn là "viện của giới elite". Thay vào đó, trong các nước liên bang, lưỡng viện trở thành cơ chế bảo vệ quyền của các bang nhỏ: mỗi bang (dù California ~40 triệu dân hay Wyoming ~580.000 dân) đều có đúng 2 thượng nghị sĩ.',
        ],
      },
      {
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Alexis_de_Tocqueville_%28Th%C3%A9odore_Chasseriau%29.jpg',
        alt: 'Chân dung Alexis de Tocqueville — nhà triết học chính trị và sử gia Pháp, tác giả của "Democracy in America"',
        caption:
          'Alexis de Tocqueville (1805–1859) — nhà triết học chính trị, sử gia và nghị sĩ người Pháp. Năm 1831, ông đến Mỹ với nhiệm vụ chính thức là nghiên cứu hệ thống nhà tù, nhưng đã dùng cơ hội đó để quan sát toàn bộ nền dân chủ Mỹ. "Democracy in America" (1835, 1840) là công trình cảnh báo về nguy cơ "tyranny of the majority" vẫn còn nguyên giá trị. Nguồn: Wikimedia Commons (Public Domain)',
      },
      {
        type: 'callout',
        icon: 'warning',
        title: 'Tyranny of the Majority — Chuyên chế của đa số',
        text: 'Tocqueville cảnh báo: trong nền dân chủ, "công luận" (public opinion) có thể trở thành một loại quyền lực rất lớn mà đa số dùng để áp đặt lên thiểu số.\n\nVí dụ đau lòng nhất: Socrates — triết gia vĩ đại nhất Athens — bị xử tử khi 56% trong bồi thẩm đoàn 500 người (280/500 phiếu) bỏ phiếu kết tội ông tội "báng bổ thần linh và làm hư hỏng thanh niên". Đa số bầu — nhưng kết quả là giết chết một trong những trí tuệ vĩ đại nhất lịch sử.',
        variant: 'warning',
      },
      {
        type: 'text',
        title: 'Lưỡng viện như một lá chắn cho thiểu số',
        paragraphs: [
          'Lưỡng viện được thiết kế một phần để làm chậm quá trình lập pháp — một dự luật phải được cả 2 viện thông qua mới trở thành luật. Điều này tạo ra thêm cơ hội để xem xét kỹ lưỡng hơn và ngăn chặn những đạo luật vội vàng có thể xâm phạm quyền của thiểu số.',
          'Ở Mỹ: Hạ viện (435 đại diện, theo tỉ lệ dân số, nhiệm kỳ 2 năm) đại diện cho "ý chí đa số dân chúng". Thượng viện (100 thượng nghị sĩ, 2 người/bang, nhiệm kỳ 6 năm) đại diện cho "quyền của các bang" — đặc biệt là bang nhỏ.',
          'Nhược điểm: lưỡng viện có thể dẫn đến "gridlock" — 2 viện không đồng ý với nhau, không luật nào được thông qua. Trong bối cảnh chính trị phân cực, đây là vấn đề ngày càng nghiêm trọng ở Mỹ.',
        ],
      },
      {
        type: 'callout',
        icon: 'warning',
        title: 'Tyranny of the Minority — Mặt kia của tấm huy chương',
        text: 'Ngược lại với "tyranny of the majority", lưỡng viện và filibuster có thể tạo ra "tyranny of the minority" (chuyên chế của thiểu số).\n\n41 thượng nghị sĩ đại diện cho ~11% dân số Mỹ có thể dùng filibuster để chặn dự luật được ủng hộ bởi 59 thượng nghị sĩ đại diện cho ~89% dân số.\n\nĐây không phải là lỗi thiết kế — mà là đánh đổi có ý thức: bảo vệ thiểu số khỏi bị đa số áp đặt, đổi lấy rủi ro thiểu số có thể chặn ý chí đa số. Không có câu trả lời hoàn hảo.',
        variant: 'warning',
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Tocqueville và dân chủ — "Democracy in America"',
        description: 'Tác phẩm kinh điển về nền dân chủ Mỹ và những cảnh báo vẫn còn nguyên giá trị',
        category: 'Chính trị học',
        estimatedReadTime: '7 phút',
        documentContent: {
          sections: [
            {
              heading: 'Tocqueville và "The American Experiment"',
              paragraphs: [
                'Alexis de Tocqueville (1805–1859), nhà triết học chính trị, sử gia và nghị sĩ người Pháp, đến Mỹ năm 1831 cùng người bạn Gustave de Beaumont. Nhiệm vụ chính thức là nghiên cứu hệ thống nhà tù Mỹ cho chính phủ Pháp (báo cáo "Du système pénitentiaire aux États-Unis", 1833). Nhưng Tocqueville đã dùng 9 tháng đó để quan sát toàn bộ nền chính trị, xã hội và văn hóa Mỹ.',
                '"Democracy in America" (1835, 1840) — hai tập xuất bản cách nhau 5 năm — được coi là phân tích sâu sắc nhất về dân chủ. Tocqueville viết: "J\'ai cherché dans l\'Amérique plus qu\'une Amérique; j\'y ai cherché une image de la démocratie elle-même, avec ses inclinations, son caractère, ses préjugés et ses passions, afin d\'en apprendre ce que nous avons à craindre ou à espérer de son progrès." (Ở Mỹ tôi tìm kiếm nhiều hơn nước Mỹ đơn thuần; tôi tìm kiếm hình ảnh của chính nền dân chủ, với những xu hướng, tính cách, định kiến và đam mê của nó — để biết chúng ta phải sợ điều gì hay hy vọng điều gì từ sự tiến triển của nền dân chủ.)',
              ],
            },
            {
              heading: 'Tyranny of the Majority — Mối nguy thực sự',
              paragraphs: [
                'Tocqueville cảnh báo: nguy hiểm lớn nhất của dân chủ không phải là nhà độc tài — mà là "tyranny of the majority" (chuyên chế của đa số). Đa số có thể dùng quyền lực chính trị để áp đặt quan điểm của mình lên thiểu số, vi phạm quyền cá nhân.',
                'Ông cũng nhận thấy nguy cơ của "soft despotism" (chuyên chế mềm): khi nhà nước ngày càng can thiệp vào mọi mặt đời sống, người dân trở nên thụ động và phụ thuộc — từ bỏ quyền tự quyết dần dần mà không nhận ra.',
              ],
            },
            {
              heading: 'Bill of Rights — Những quyền đứng trên đa số',
              paragraphs: [
                '10 điều khoản đầu tiên của Hiến pháp Mỹ (Bill of Rights, 1791) là câu trả lời cụ thể nhất cho lo ngại "tyranny of the majority": đây là những quyền KHÔNG thể bị bất kỳ đa số nào bỏ phiếu tước đoạt. Tự do ngôn luận, tự do tôn giáo, quyền không bị lục soát vô cớ — tất cả đứng trên luật đa số thông thường.',
                'Nguyên tắc này — một số quyền vượt ra ngoài tầm với của đa số — là nền tảng của nền dân chủ tự do (liberal democracy), phân biệt với "majoritarianism" thuần túy (đa số quyết định tất cả).',
              ],
            },
            {
              heading: 'Lords Reform 1999 — Lưỡng viện tự cải tổ',
              paragraphs: [
                'House of Lords Act 1999 (Anh) là một trong những cải cách thể chế quan trọng nhất thế kỷ 20: loại bỏ 650/759 quý tộc thế tập (hereditary peers) khỏi Thượng viện, chỉ giữ lại 92 theo quy trình bầu chọn nội bộ. Thượng viện Anh ngày nay chủ yếu gồm các "life peers" — được bổ nhiệm theo đề xuất của Thủ tướng vì chuyên môn, không vì dòng dõi.',
                'Đây là ví dụ về thể chế tự cải cách — thay đổi vai trò lưỡng viện từ đại diện giai cấp sang đại diện chuyên môn. Nhưng cải cách vẫn chưa hoàn toàn: House of Lords vẫn là cơ quan không được bầu dân chủ, vẫn có quyền trì hoãn (nhưng không veto) luật của Hạ viện.',
              ],
            },
            {
              heading: 'Jim Crow — Khi liên bang bị lạm dụng để áp bức thiểu số',
              paragraphs: [
                'Từ 1877 đến 1964, các bang miền Nam Mỹ dùng quyền tự trị bang để ban hành luật Jim Crow — cấm người da đen bầu cử (poll tax, literacy test), sống và học cùng người da trắng (segregation). Đây là 87 năm "tyranny of the majority" da trắng dùng cơ chế dân chủ để áp bức thiểu số.',
                'Paradox quan trọng: cả liên bang (trao quyền tự trị bang) lẫn đa số địa phương đều hoạt động "đúng theo quy trình" — nhưng kết quả là bất công. Điều này nhắc nhở: thể chế không tự nhiên công bằng — phụ thuộc vào ai kiểm soát và có quyền lực bảo vệ thiểu số hay không.',
              ],
            },
            {
              heading: 'Giải pháp: Thể chế dân sự và Tự do ngôn luận',
              paragraphs: [
                'Tocqueville quan sát thấy Mỹ có một điểm đặc biệt: ngoài thể chế pháp luật, còn có hàng nghìn "hiệp hội dân sự" — hội tự nguyện, nhà thờ, tổ chức cộng đồng — đóng vai trò gắn kết xã hội và kiểm soát quyền lực nhà nước từ bên dưới.',
                'Aristotle cũng nhấn mạnh điều tương tự: dân chủ cần những "công dân tự do, có khả năng tư duy lý trí, biết suy nghĩ cho lợi ích chung" — chứ không chỉ là những người biết đi bầu. Đây là khái niệm "civic virtue" (đức hạnh công dân).',
              ],
            },
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — Bạn đã nắm được gì?',
        text: '✓ Lưỡng viện: 2 viện trong quốc hội — hạ viện (theo dân số) + thượng viện (theo bang hoặc theo tầng lớp lịch sử)\n✓ Mục đích: làm chậm lập pháp, bảo vệ bang nhỏ, giảm mob rule\n✓ Nhược điểm: dễ gây gridlock, và thậm chí tạo "tyranny of the minority"\n✓ Socrates: 56% (280/500) phiếu kết tội — ví dụ lịch sử của tyranny of majority\n✓ Tocqueville (1805–1859): nhà triết học chính trị, đến Mỹ 1831 ban đầu để nghiên cứu nhà tù, viết "Democracy in America" cảnh báo về soft despotism\n✓ Bill of Rights: những quyền đứng TRÊN đa số — không thể bị bỏ phiếu tước đoạt\n✓ Dân chủ cần "civic virtue" — công dân biết tư duy độc lập và nghĩ cho lợi ích chung',
        variant: 'success',
      },
      {
        type: 'question',
        question: '"Tyranny of the majority" theo Tocqueville đề cập đến vấn đề gì trong nền dân chủ?',
        options: [
          { text: 'Nguy cơ một nhà lãnh đạo được bầu lên trở thành nhà độc tài', isCorrect: false },
          {
            text: 'Đa số có thể dùng quyền lực dân chủ để áp đặt ý chí lên thiểu số, vi phạm quyền cá nhân',
            isCorrect: true,
          },
          { text: 'Tỉ lệ cử tri đi bầu quá thấp khiến thiểu số kiểm soát kết quả', isCorrect: false },
          { text: 'Nguy cơ đảng phái thiểu số dùng tiền mua phiếu bầu', isCorrect: false },
        ],
        explanation:
          '"Tyranny of the majority" là khái niệm của Tocqueville trong "Democracy in America": trong nền dân chủ, đa số cử tri có thể sử dụng quyền bầu cử hợp pháp để áp đặt luật lệ và văn hóa lên các nhóm thiểu số. Socrates bị xử tử bởi 56% bầu thẩm đoàn là ví dụ lịch sử đau lòng nhất. Đây là lý do tại sao dân chủ cần bill of rights, judicial review và các cơ chế bảo vệ thiểu số khỏi ý chí đa số.',
      },
      {
        type: 'text',
        title: 'Tổng kết Level 3 — Và nhìn về Level 4',
        paragraphs: [
          'Trong Level 3, chúng ta đã khám phá bộ công cụ mà khoa học chính trị tạo ra để giải quyết "bài toán thứ 2 của dân chủ" — cân bằng quyền lực: tam quyền phân lập (chiều ngang), liên bang (chiều dọc), checks and balances (cơ chế vận hành), và lưỡng viện (bảo vệ thiểu số). Không công cụ nào hoàn hảo — mỗi cái đều có đánh đổi riêng.',
          'Nhưng Tocqueville đã nhắc nhở chúng ta: những thể chế pháp luật này chỉ là một phần. Phần còn lại — và có lẽ quan trọng hơn — là văn hóa và con người. Nền dân chủ cần công dân có tư duy độc lập, có "civic virtue", và hiểu được quyền của mình.',
          'Level 4 — chương cuối của khoá học — sẽ khám phá hành trình lịch sử đó: từ câu chuyện bỏ phiếu công khai vs bỏ phiếu bí mật, đến lịch sử đầy máu và nước mắt của quyền bầu cử ở Mỹ, và cuối cùng: tại sao dân chủ là một hiện tượng bất thường cần được bảo vệ.',
        ],
      },
    ],
  },
};

// ─────────────────────────────────────────────
// Main — upsert updated Level 3 content
// ─────────────────────────────────────────────
async function main() {
  console.log('🏛️  Updating Level 3 content — "Của dân, do dân, vì dân"');
  console.log('='.repeat(60));

  const slugs = Object.keys(level3Updated);
  console.log(`\nUpdating ${slugs.length} lessons: ${slugs.join(', ')}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const slug of slugs) {
    const content = level3Updated[slug];
    try {
      const lesson = await prisma.lesson.findUnique({ where: { slug } });
      if (!lesson) {
        console.log(`  ⚠️  Lesson "${slug}" not found — skipping`);
        errorCount++;
        continue;
      }

      await prisma.lessonContent.upsert({
        where: { lessonId: lesson.id },
        create: {
          lessonId: lesson.id,
          title: content.title,
          blocks: content.blocks as any,
        },
        update: {
          title: content.title,
          blocks: content.blocks as any,
        },
      });

      console.log(`  ✅  ${slug}: "${content.title}" — ${content.blocks.length} blocks`);
      successCount++;
    } catch (err) {
      console.error(`  ❌  ${slug}: Failed —`, err);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Level 3 update complete!`);
  console.log(`   Success: ${successCount} lessons`);
  if (errorCount > 0) console.log(`   Errors:  ${errorCount} lessons`);
}

main()
  .catch((e) => {
    console.error('Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
