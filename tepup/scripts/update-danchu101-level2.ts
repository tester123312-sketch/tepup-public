/**
 * Update Level 2 content for "Của dân, do dân, vì dân" (dan-chu-101)
 *
 * FIXES (factual errors & clarifications):
 *   - danchu101-5: Duverger death year 2013 (not 2014)
 *   - danchu101-5: Perot "~19% (18.91%)" clarification
 *   - danchu101-6: Oscar IRV → hạng mục Best Picture only (not all categories)
 *   - danchu101-7: Shaw v. Reno — "strict scrutiny" not "cấm"
 *   - danchu101-7: NC 2012 = 9/13 seats, 2014+ = 10/13 seats (clarified)
 *   - danchu101-8: NPVIC date-stamped "tính đến 2024"
 *
 * ENRICHMENT:
 *   - danchu101-4: Borda Count callout + Condorcet Winner in practice (expanded library-doc)
 *   - danchu101-5: "Tại sao FPTP vẫn tồn tại?" callout + UK/Canada case study (enhanced library-doc)
 *   - danchu101-6: IRV thực tế (Maine, Alaska) callout + New Zealand MMP section
 *   - danchu101-7: AI & algorithmic gerrymandering callout + Efficiency Gap in library-doc
 *   - danchu101-8: Swing States callout + Gibbard-Satterthwaite section in library-doc
 *
 * Run: cd tepup && npx tsx scripts/update-danchu101-level2.ts
 */

import 'dotenv/config';
import { prisma } from '../lib/prisma';

const level2UpdatedContents: Record<string, { title: string; blocks: any[] }> = {
  // ─────────────────────────────────────────────────────────────────────────
  // LESSON 4: Nghịch lý Condorcet — Ý chí tập thể có tồn tại không?
  // Changes: + Borda Count callout, + expanded library-doc, + Arrow preview
  // ─────────────────────────────────────────────────────────────────────────
  'danchu101-4': {
    title: 'Nghịch lý Condorcet — Ý chí tập thể có tồn tại không?',
    blocks: [
      {
        type: 'text',
        title: 'Trong bài học này bạn sẽ học được gì?',
        paragraphs: [
          'Chúng ta đã biết dân chủ đại diện cần một cơ chế để người dân đưa ra quyết định tập thể. Hình thức phổ biến nhất là bầu cử theo đa số — majority rule. Nghe có vẻ đơn giản: ai nhiều phiếu hơn thì thắng.',
          'Nhưng ngay từ thế kỷ 18, một nhà toán học người Pháp đã phát hiện ra một vấn đề nan giải: khi có 3 lựa chọn trở lên, kết quả bầu cử có thể tạo ra một vòng lặp không có lối thoát. Ý chí tập thể — thứ mà nền dân chủ muốn nắm bắt — đôi khi đơn giản là không tồn tại.',
          'Bài học này khám phá Nghịch lý Condorcet: một trong những vấn đề nền tảng nhất của lý thuyết bầu cử, và tại sao nó khiến việc thiết kế một hệ thống bầu cử trở nên phức tạp hơn rất nhiều.',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Câu hỏi trung tâm của bài học',
        text: 'Khi mỗi cá nhân đều có thứ tự ưu tiên rõ ràng (thích A hơn B, B hơn C), liệu chúng ta có thể tổng hợp những ý kiến riêng lẻ đó thành một "ý chí tập thể" nhất quán?',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Bài toán: Khi 3 người có 3 ứng viên',
        paragraphs: [
          'Hãy tưởng tượng 3 người bạn — Vân, Tiến, và Quang — phải cùng chọn 1 trong 3 ứng viên: A, B, C. Mỗi người có thứ tự ưa thích rõ ràng:',
          '• Vân: A > B > C (thích A nhất, rồi B, rồi C)\n• Tiến: B > C > A (thích B nhất, rồi C, rồi A)\n• Quang: C > A > B (thích C nhất, rồi A, rồi B)',
          'Nếu chỉ tính người được chọn nhiều nhất, mỗi người chọn 1 ứng viên khác nhau — không thể thống nhất. Nhưng nếu xét theo mức độ yêu thích, ta thấy: 2/3 thích A hơn B (Vân và Quang), 2/3 thích B hơn C (Vân và Tiến), và 2/3 thích C hơn A (Tiến và Quang).',
          'Kết quả: A > B > C > A — một vòng lặp không có điểm kết thúc! Không có "người chiến thắng" rõ ràng nếu xét theo ý chí tập thể.',
        ],
      },
      {
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Nicolas_de_Condorcet.PNG',
        alt: 'Chân dung Marquis de Condorcet — nhà toán học và triết học chính trị người Pháp thế kỷ 18',
        caption:
          'Marquis de Condorcet (1743–1794) — nhà toán học người Pháp đã chứng minh nghịch lý mang tên ông. Ông là một trong những người đặt nền móng cho lý thuyết bầu cử hiện đại và lý thuyết lựa chọn xã hội (Social Choice Theory). Nguồn: Wikimedia Commons (Public Domain)',
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Nghịch lý Condorcet là gì?',
        text: 'Condorcet (1743–1794) chứng minh rằng không thể luôn luôn đưa ra quyết định tập thể nhất quán bằng cách so sánh từng cặp ứng viên rồi tổng hợp lại. Tập hợp ý kiến của nhiều cá nhân có thứ tự ưu tiên hợp lý vẫn có thể tạo ra một tập thể với ưu tiên... vòng lặp.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Vì sao điều này quan trọng?',
        paragraphs: [
          'Nghịch lý Condorcet cho thấy rằng trong nhiều trường hợp, không tồn tại một "ý chí tập thể" duy nhất và nhất quán. Thay vào đó, kết quả bầu cử phụ thuộc rất nhiều vào hệ thống luật mà bạn dùng để so sánh các ứng viên.',
          'Điều này có nghĩa là: người kiểm soát luật bầu cử — thứ tự bầu, cách thức bầu, số vòng bầu — có thể định hình kết quả theo ý muốn, ngay cả khi tất cả mọi người bầu cử hoàn toàn trung thực.',
          'Đây chính là lý do tại sao có rất nhiều hệ thống bầu cử khác nhau trên thế giới, và tại sao việc chọn luật bầu cử là một quyết định chính trị có tính chiến lược cao — không chỉ là bài toán kỹ thuật.',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Borda Count — Giải pháp của người cùng thời',
        text: 'Jean-Charles de Borda (1733–1799), đồng nghiệp người Pháp của Condorcet, đề xuất một phương pháp thay thế: thay vì bầu 1 ứng viên, hãy để cử tri xếp hạng tất cả ứng viên. Điểm được tính theo thứ hạng (ví dụ: hạng 1 = 2 điểm, hạng 2 = 1 điểm, hạng 3 = 0 điểm). Ứng viên tổng điểm cao nhất thắng.\n\nBorda Count tránh được nhiều trường hợp Condorcet Paradox — nhưng vẫn có thể bị thao túng chiến thuật. Condorcet và Borda thực ra không ưa nhau và thường tranh luận gay gắt về phương pháp của nhau tại Académie des Sciences.',
        variant: 'info',
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Nghịch lý Condorcet và Lý thuyết Lựa chọn Xã hội',
        description: 'Phân tích sâu hơn về Condorcet Paradox, Condorcet Winner, và các ứng dụng thực tế',
        category: 'Chính trị học',
        estimatedReadTime: '6 phút',
        documentContent: {
          sections: [
            {
              heading: 'Marquis de Condorcet và Social Choice Theory',
              paragraphs: [
                'Nicolas de Condorcet (1743–1794) là nhà toán học, triết học chính trị và nhà cách mạng người Pháp. Ông là một trong những người đầu tiên áp dụng toán học vào khoa học xã hội, đặc biệt là lý thuyết bầu cử.',
                'Trong tác phẩm "Essai sur l\'application de l\'analyse à la probabilité des décisions rendues à la pluralité des voix" (1785), ông chỉ ra rằng bầu cử theo đa số có thể dẫn đến kết quả không nhất quán khi có 3 ứng viên trở lên.',
              ],
            },
            {
              heading: 'Condorcet Winner và Condorcet Method',
              paragraphs: [
                'Một "Condorcet Winner" là ứng viên có thể đánh bại tất cả ứng viên khác trong các trận đấu tay đôi (pairwise comparisons). Condorcet đề xuất rằng nếu tồn tại Condorcet Winner, người đó nên thắng cuộc bầu cử — và hầu hết mọi người đồng ý đây là tiêu chí hợp lý.',
                'Tuy nhiên, nghịch lý cho thấy: không phải lúc nào cũng tồn tại Condorcet Winner. Khi không có, ta phải dùng các phương pháp khác — và đó là nơi các hệ thống bầu cử khác nhau đưa ra các đáp án khác nhau.',
              ],
            },
            {
              heading: 'Condorcet Method trong thực tế',
              paragraphs: [
                'Một số tổ chức thực sự áp dụng Condorcet Method cho bầu cử nội bộ: Wikimedia Foundation (tổ chức điều hành Wikipedia) dùng để bầu ban giám đốc; cộng đồng Debian Linux dùng để biểu quyết chính sách kỹ thuật; nhiều hội đồng quản trị doanh nghiệp nhỏ áp dụng biến thể của phương pháp này.',
                'Ở quy mô nhỏ, Condorcet Method hoạt động tốt vì ít xảy ra nghịch lý. Vấn đề chủ yếu xuất hiện khi số ứng viên lớn hoặc khi phân bố ý kiến của cử tri đặc biệt phân tán.',
              ],
            },
            {
              heading: 'Gần 200 năm sau: Arrow sẽ kết thúc cuộc tranh luận',
              paragraphs: [
                'Condorcet và Borda tranh luận về phương pháp bầu cử tốt nhất — nhưng cả hai đều chưa có câu trả lời dứt khoát. Năm 1951, nhà kinh tế học Kenneth Arrow sẽ chứng minh bằng toán học rằng không có phương pháp nào là hoàn hảo.',
                'Arrow Impossibility Theorem — mà bạn sẽ học ở bài cuối Level 2 — là bước tiến lý thuyết quan trọng nhất kể từ thời Condorcet, và nó đặt dấu chấm hết cho hy vọng tìm ra một hệ thống bầu cử "lý tưởng".',
              ],
            },
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — Bạn đã nắm được gì?',
        text: '✓ Majority rule (bầu theo đa số) là hình thức phổ biến nhất để ra quyết định tập thể\n✓ Khi có 3+ lựa chọn, kết quả có thể tạo ra vòng lặp A > B > C > A — không có người thắng rõ ràng\n✓ Đây gọi là Nghịch lý Condorcet — chứng minh ý chí tập thể không phải lúc nào cũng nhất quán\n✓ Hệ thống luật bầu cử khác nhau → kết quả khác nhau → ai kiểm soát luật có lợi thế lớn\n✓ Borda Count là phương án thay thế của thời đại Condorcet — nhưng cũng không hoàn hảo',
        variant: 'success',
      },
      {
        type: 'question',
        question: 'Nghịch lý Condorcet xảy ra khi nào?',
        options: [
          { text: 'Khi có 2 ứng viên và kết quả hòa', isCorrect: false },
          {
            text: 'Khi ý kiến của các cá nhân không thể tổng hợp thành một thứ tự ưu tiên tập thể nhất quán',
            isCorrect: true,
          },
          { text: 'Khi ứng viên có ít phiếu nhất lại thắng', isCorrect: false },
          { text: 'Khi tỉ lệ người đi bầu quá thấp', isCorrect: false },
        ],
        explanation:
          'Nghịch lý Condorcet xảy ra khi tổng hợp ý kiến của nhiều người (mỗi người có thứ tự ưu tiên hợp lý) lại tạo ra thứ tự ưu tiên tập thể mang tính vòng lặp (A > B > C > A), không xác định được "người thắng" rõ ràng.',
      },
      {
        type: 'text',
        title: 'Tổng kết — Và bài học tiếp theo',
        paragraphs: [
          'Condorcet đã trao cho chúng ta một góc nhìn đáng lo ngại: "ý chí tập thể" — thứ mà nền dân chủ muốn thể hiện — đôi khi đơn giản là không tồn tại theo nghĩa toán học. Đây không phải là lý do để từ bỏ dân chủ, mà là lý do để thiết kế hệ thống bầu cử một cách cẩn thận.',
          'Bài học tiếp theo, chúng ta sẽ khám phá hệ thống bầu cử phổ biến nhất thế giới hiện nay — First-past-the-post ("được ăn cả, ngã về không") — và hiểu tại sao dù rất phổ biến, nó lại có một nhược điểm khét tiếng tên là Spoiler Effect.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LESSON 5: First-past-the-post & Spoiler Effect
  // Changes: FIX Duverger 2013, FIX Perot, + "Tại sao FPTP vẫn tồn tại?" callout,
  //          + UK/Canada case study in library-doc
  // ─────────────────────────────────────────────────────────────────────────
  'danchu101-5': {
    title: 'First-past-the-post & Spoiler Effect',
    blocks: [
      {
        type: 'text',
        title: 'Trong bài học này bạn sẽ học được gì?',
        paragraphs: [
          '"Được ăn cả, ngã về không" — đây là cách dân gian mô tả hệ thống bầu cử First-past-the-post (FPTP). Nghe có vẻ công bằng: ai nhiều phiếu nhất thì thắng, đơn giản và minh bạch.',
          'Nhưng FPTP ẩn chứa một vấn đề mang tên Spoiler Effect — hiệu ứng chia phiếu. Khi có nhiều hơn 2 ứng viên, kết quả có thể là ứng viên được ít người muốn nhất lại thắng cuộc.',
          'Bài học này giải thích tại sao FPTP phổ biến, tại sao nó tạo ra hệ thống 2 đảng như ở Mỹ, và tại sao người ta dần tìm kiếm các giải pháp thay thế.',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'First-past-the-post (FPTP) — Định nghĩa',
        text: 'FPTP là hệ thống bầu cử trong đó ứng viên giành được nhiều phiếu nhất sẽ thắng, bất kể có đạt đa số tuyệt đối (>50%) hay không. Hệ thống này được dùng ở Mỹ, Anh, Canada, Ấn Độ và nhiều nước khác.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Câu chuyện khu rừng: Khi 40% thắng 60%',
        paragraphs: [
          'Hãy tưởng tượng muông thú trong một khu rừng đang bầu sơn lâm chúa tể. Có 3 ứng viên: Hổ Văn (ăn thịt), Tê Giác Sám (ăn cỏ), và Linh Dương (ăn cỏ). Kết quả:',
          '• Hổ Văn: 40% phiếu ủng hộ\n• Tê Giác Sám: 35% phiếu ủng hộ\n• Linh Dương: 25% phiếu ủng hộ',
          'Theo FPTP, Hổ Văn thắng với 40% — dù 60% cử tri (Tê Giác + Linh Dương) muốn một lãnh đạo chủ trương hòa bình. Tê Giác và Linh Dương có cùng quan điểm nhưng chia sẻ phiếu, khiến Hổ Văn lợi dụng để thắng.',
          'Đây chính là Spoiler Effect (hiệu ứng chia phiếu): khi 2 ứng viên có quan điểm tương đồng cùng tranh cử, họ ăn phiếu của nhau và vô tình tạo điều kiện cho ứng viên khác biệt chiến thắng. Hổ Văn thậm chí còn có thể chủ động khuyến khích thêm ứng viên ăn cỏ khác tham gia để chia phiếu đối thủ nhiều hơn.',
        ],
      },
      {
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/US_2016_presidential_election_by_county.svg',
        alt: 'Bản đồ kết quả bầu cử tổng thống Mỹ 2016 theo quận — minh hoạ hệ thống winner-takes-all của FPTP',
        caption:
          'Bầu cử tổng thống Mỹ 2016 theo từng quận. Trong hệ thống FPTP "winner-takes-all", nhiều vùng lãnh thổ màu xanh hay đỏ đậm là các khu vực "an toàn" — không ai thực sự tranh đấu ở đó. Nguồn: Wikimedia Commons (Public Domain)',
      },
      {
        type: 'callout',
        icon: 'warning',
        title: 'Tactical Voting — Bỏ phiếu chiến thuật',
        text: 'Do Spoiler Effect, cử tri FPTP thường không bầu cho ứng viên họ thích nhất, mà bầu cho ứng viên "có khả năng đánh bại người họ ghét nhất". Đây gọi là tactical voting (bỏ phiếu chiến thuật).\n\nVí dụ: Năm 2016, nhiều người thích Bernie Sanders hơn Hillary Clinton, nhưng vẫn bầu Hillary để đánh bại Trump. Kết quả: ý kiến thực sự của họ không được phản ánh trong cuộc bầu cử.',
        variant: 'warning',
      },
      {
        type: 'text',
        title: 'Tại sao FPTP tạo ra hệ thống 2 đảng?',
        paragraphs: [
          'Spoiler Effect không chỉ ảnh hưởng đến từng cuộc bầu cử — theo thời gian, nó định hình toàn bộ hệ thống chính trị.',
          'Khi cử tri biết rằng bầu cho đảng thứ 3 sẽ "lãng phí phiếu" và vô tình giúp ứng viên họ ghét thắng, họ sẽ dần tập trung phiếu vào 2 ứng viên mạnh nhất. Các đảng nhỏ cũng dần bị loại ra khỏi cuộc chơi. Kết quả là một hệ thống 2 đảng như ở Mỹ (Dân chủ và Cộng hòa).',
          'Đây được gọi là Duverger\'s Law — quy luật do nhà khoa học chính trị người Pháp Maurice Duverger (1917–2013) đưa ra: FPTP có xu hướng tự nhiên dẫn đến hệ thống 2 đảng, trong khi các hệ thống bầu cử khác thường tạo ra đa đảng.',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Tại sao FPTP vẫn tồn tại dù bị chỉ trích?',
        text: 'FPTP có những ưu điểm thực sự khiến nhiều nền dân chủ lâu đời vẫn giữ nó:\n\n• Accountability rõ ràng: mỗi đại biểu đại diện một khu vực địa lý cụ thể — cử tri biết chính xác ai chịu trách nhiệm trước họ\n• Chính phủ ổn định: FPTP thường tạo ra chính phủ đa số, ít phải liên minh phức tạp\n• Đơn giản, dễ hiểu: một lá phiếu, người nhiều phiếu nhất thắng — không cần giải thích\n• Inertia chính trị: những người đang hưởng lợi từ FPTP (các đảng lớn) không có động cơ thay đổi nó',
        variant: 'info',
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: FPTP trong thực tế — Anh, Canada và hệ quả méo mó',
        description: 'Khi tỉ lệ phiếu và tỉ lệ ghế trong quốc hội tách rời nhau: các case study từ Anh và Canada',
        category: 'Chính trị học',
        estimatedReadTime: '6 phút',
        documentContent: {
          sections: [
            {
              heading: 'Anh 2010 — Lib Dems và "phiếu lãng phí"',
              paragraphs: [
                'Trong tổng tuyển cử Anh 2010, Đảng Tự do Dân chủ (Liberal Democrats) nhận được 23% tổng số phiếu trên toàn quốc — nhưng chỉ giành được 57/650 ghế Hạ viện (8.7%). Hai đảng lớn nhận kết quả ngược lại: Bảo thủ với 36% phiếu giành 306 ghế (47%), Lao Động với 29% giành 258 ghế (40%).',
                'Đây là minh hoạ rõ ràng nhất về "phiếu lãng phí" trong FPTP: hàng triệu phiếu bầu cho đảng thứ 3 không chuyển hoá thành ghế vì phân tán trên nhiều khu vực bầu cử, không đủ đông để thắng ở bất kỳ khu vực nào.',
              ],
            },
            {
              heading: 'Canada 2015 — Đa số từ thiểu số',
              paragraphs: [
                'Tổng tuyển cử Canada 2015: Đảng Tự do (Liberal) của Justin Trudeau nhận 39.5% phiếu phổ thông — nhưng giành 184/338 ghế (54.4%), tức là đa số tuyệt đối trong Hạ viện. Đảng NDP nhận 19.7% phiếu nhưng chỉ có 44 ghế (13%).',
                'FPTP biến 39.5% phiếu thành 54.4% ghế — "thưởng" cho đảng thắng và "phạt" nặng đảng về nhì. Đây không phải ngoại lệ mà là quy luật của FPTP: chiến thắng thường bị khuếch đại, thua cuộc bị phóng đại.',
              ],
            },
            {
              heading: 'Trưng cầu về Alternative Vote ở Anh (2011)',
              paragraphs: [
                'Năm 2011, Anh tổ chức trưng cầu dân ý về việc chuyển từ FPTP sang Alternative Vote (AV) — một biến thể của IRV. Kết quả: 67.9% người Anh chọn giữ FPTP. Chiến dịch ủng hộ AV thất bại một phần vì thông điệp phức tạp, một phần vì các đảng lớn vận động giữ nguyên hệ thống có lợi cho họ.',
                'Bài học từ Anh 2011: cải cách hệ thống bầu cử cực kỳ khó, ngay cả ở các nền dân chủ trưởng thành. Người nắm quyền luôn có xu hướng bảo vệ hệ thống đã đưa họ lên nắm quyền.',
              ],
            },
            {
              heading: 'Spoiler Effect trong lịch sử bầu cử Mỹ',
              paragraphs: [
                'Ví dụ nổi tiếng nhất: Bầu cử tổng thống Mỹ 2000. Ralph Nader (ứng viên đảng Xanh) nhận 97,421 phiếu ở Florida — bang mà Gore thua Bush chỉ 537 phiếu. Nếu không có Nader, hầu hết phiếu của ông sẽ về tay Gore.',
                'Ross Perot năm 1992 nhận ~19% (18.91%) phiếu phổ thông toàn quốc — kỷ lục của ứng viên thứ 3 ở Mỹ thế kỷ 20. Tuy nhiên, nghiên cứu cho thấy phiếu của Perot phân tán đều từ cả hai phía, không rõ ông thực sự "giúp" Clinton như narrative phổ biến.',
              ],
            },
            {
              heading: 'Duverger\'s Law',
              paragraphs: [
                'Maurice Duverger (1917–2013) là nhà khoa học chính trị Pháp, quan sát thấy rằng FPTP có xu hướng tự nhiên tạo ra hệ thống 2 đảng. Ngược lại, proportional representation và two-round system thường dẫn đến đa đảng.',
                'Duverger\'s Law hiện vẫn là một trong những quy luật mạnh nhất của khoa học chính trị thực nghiệm — dù có một số ngoại lệ, như Canada và Ấn Độ vẫn có đa đảng dù dùng FPTP.',
              ],
            },
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — Bạn đã nắm được gì?',
        text: '✓ FPTP: người nhiều phiếu nhất thắng, không cần đa số tuyệt đối\n✓ Spoiler Effect: 2 ứng viên cùng quan điểm chia phiếu → ứng viên khác biệt thắng\n✓ Tactical voting: cử tri bầu chiến lược thay vì bầu theo ý thích thật sự\n✓ Duverger\'s Law: FPTP dẫn đến hệ thống 2 đảng theo thời gian\n✓ Ưu điểm: đơn giản, ổn định, accountability rõ ràng; Nhược điểm: méo mó đại diện, phiếu lãng phí',
        variant: 'success',
      },
      {
        type: 'question',
        question: 'Spoiler Effect xảy ra khi nào trong bầu cử FPTP?',
        options: [
          { text: 'Khi ứng viên nổi tiếng nhất bị loại do gian lận', isCorrect: false },
          {
            text: 'Khi 2 ứng viên có quan điểm tương đồng chia sẻ phiếu, khiến ứng viên khác biệt thắng',
            isCorrect: true,
          },
          { text: 'Khi số cử tri đi bầu quá ít, không đủ tính đại diện', isCorrect: false },
          { text: 'Khi 1 ứng viên giành được trên 50% số phiếu', isCorrect: false },
        ],
        explanation:
          'Spoiler Effect xảy ra khi 2 ứng viên có lập trường tương đồng cùng tham gia bầu cử, chia sẻ lượng phiếu của cùng một nhóm cử tri. Kết quả là cả hai đều thua, và ứng viên với lập trường đối lập — dù được thiểu số ủng hộ hơn — lại thắng.',
      },
      {
        type: 'text',
        title: 'Tổng kết — Và bài học tiếp theo',
        paragraphs: [
          'FPTP là hệ thống quen thuộc và được ưa chuộng vì tính đơn giản. Nhưng Spoiler Effect cho thấy: sự đơn giản đôi khi đi kèm với cái giá là kết quả không phản ánh ý chí thực sự của đa số.',
          'Bài học tiếp theo, chúng ta sẽ tìm hiểu hai hệ thống được thiết kế để khắc phục vấn đề này: Two-round system (bầu hai vòng) và Instant Runoff Voting. Liệu chúng có giải quyết được vấn đề — hay lại tạo ra những vấn đề mới?',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LESSON 6: Hệ thống hai vòng & Bầu cử ưu tiên
  // Changes: FIX Oscar IRV scope, + IRV thực tế callout, + NZ MMP trong library-doc
  // ─────────────────────────────────────────────────────────────────────────
  'danchu101-6': {
    title: 'Hệ thống hai vòng & Bầu cử ưu tiên',
    blocks: [
      {
        type: 'text',
        title: 'Trong bài học này bạn sẽ học được gì?',
        paragraphs: [
          'Chúng ta đã thấy FPTP có thể cho ra kết quả bất công do Spoiler Effect. Vậy các nhà thiết kế hệ thống bầu cử đã nghĩ ra những giải pháp nào?',
          'Bài học này khám phá ba cách tiếp cận khác nhau: Two-round system (bầu hai vòng — được dùng ở Pháp), Instant Runoff Voting (loại bỏ lần lượt — được dùng trong giải Oscar và ngày càng nhiều cuộc bầu cử thực tế), và Proportional Representation (đại diện tỉ lệ). Mỗi hệ thống giải quyết một số vấn đề, nhưng đồng thời tạo ra những đánh đổi riêng.',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Ba hướng tiếp cận trong bài học này',
        text: '1. Two-round system (bầu hai vòng): nếu không ai đạt quá bán ở vòng 1, top 2 tiếp tục vào vòng 2\n2. Instant Runoff Voting (IRV): loại lần lượt ứng viên ít phiếu nhất qua từng vòng\n3. Proportional Representation (đại diện tỉ lệ): tỉ lệ phiếu = tỉ lệ ghế trong quốc hội',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Two-round System — Bầu hai vòng',
        paragraphs: [
          'Trong hệ thống hai vòng, nếu có một ứng viên đạt quá bán số phiếu (>50%) ở vòng 1, họ thắng ngay. Nếu không, hai ứng viên có nhiều phiếu nhất sẽ vào vòng 2 — lúc này cử tri của những ứng viên bị loại có cơ hội cân nhắc lại lựa chọn.',
          'Ưu điểm: đảm bảo người thắng được đa số ủng hộ. Nhưng liệu nó có giải quyết được Spoiler Effect? Hãy quay lại khu rừng của chúng ta — lần này với 5 ứng viên: Hổ Văn (30%), Tinh Tinh (25%), Tê Giác (20%), Linh Dương (15%), Hà Mã (10%).',
          'Theo two-round: Hổ Văn và Tinh Tinh vào vòng 2. Cả 3 ứng viên ăn cỏ (tổng 45%) bị loại ở vòng 1. Nhóm ăn cỏ là đa số nhưng không có đại diện ở vòng 2 — vẫn là vấn đề.',
        ],
      },
      {
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/France_2002_presidential_election_second_round.svg',
        alt: 'Bản đồ kết quả vòng 2 bầu cử tổng thống Pháp 2002 — Chirac thắng 82% sau khi cánh tả dồn phiếu',
        caption:
          'Vòng 2 bầu cử tổng thống Pháp 2002: Chirac (xanh dương) thắng áp đảo Le Pen (xanh nhạt) với 82.21% phiếu. Nhưng đây là chiến thắng "chống cực hữu" chứ không phải chiến thắng của trung hữu — vì cử tri cánh tả không có lựa chọn khác. Nguồn: Wikimedia Commons (CC BY-SA)',
      },
      {
        type: 'callout',
        icon: 'warning',
        title: 'Bầu cử Pháp 2002 — Khi two-round cũng thất bại',
        text: 'Vòng 1 (21/4/2002), Pháp có 16 ứng viên. Chirac (trung hữu): 19.88%, Le Pen (cực hữu): 16.86%, Jospin (trung tả): 16.18%.\n\nCánh tả có quá nhiều ứng viên → chia phiếu → Jospin rớt vòng 1, chỉ cách Le Pen 0.68%! Cử tri tả bị buộc phải dồn phiếu cho Chirac để ngăn cực hữu. Kết quả: Chirac thắng 82.21% — không phải vì được yêu thích, mà vì là "lựa chọn tệ hơn ít hơn".',
        variant: 'warning',
      },
      {
        type: 'text',
        title: 'Instant Runoff Voting (IRV) — Loại dần từng vòng',
        paragraphs: [
          'IRV (còn gọi là ranked-choice voting) giải quyết vấn đề của two-round bằng cách loại lần lượt ứng viên ít phiếu nhất sau mỗi vòng, thay vì chỉ giữ top 2 ngay từ đầu. Nếu có 15 ứng viên, sẽ có 14 vòng — mỗi vòng loại 1.',
          'Ưu điểm: tránh được trường hợp như Pháp 2002 — nhóm cánh tả sẽ không bị loại sớm do có quá nhiều ứng viên cùng nhóm. Cử tri cũng không cần bầu chiến thuật — cứ bầu theo thứ tự yêu thích thật sự là đủ.',
          'Nhược điểm: nếu có quá nhiều ứng viên trong một cuộc bầu cử quốc gia, hệ thống cực kỳ tốn kém và phức tạp về hậu cần. Vì vậy IRV thường áp dụng tốt nhất khi số lượng ứng viên vừa phải — điển hình là hạng mục Phim hay nhất (Best Picture) của giải Oscar, nơi Academy dùng ranked-choice voting từ năm 2009 sau khi mở rộng danh sách đề cử lên 10 phim.',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'IRV trong bầu cử thực tế — Không chỉ là lý thuyết',
        text: 'IRV (ranked-choice voting) đang được áp dụng ngày càng rộng rãi:\n\n• Úc: dùng IRV cho Hạ viện liên bang từ năm 1918 — hệ thống quốc gia lâu đời nhất\n• Maine (2018): bang đầu tiên của Mỹ dùng RCV trong bầu cử Quốc hội liên bang\n• Alaska (2022): áp dụng RCV cho tổng tuyển cử — gây tranh cãi nhưng cho kết quả bất ngờ\n• New York City (2021): dùng RCV trong bầu cử thị trưởng với 13 ứng viên, kiểm phiếu mất 2 tuần\n\nKhó khăn thực tế: kiểm phiếu IRV phức tạp hơn và mất nhiều thời gian hơn FPTP — đây là lý do nhiều quốc gia chần chừ áp dụng.',
        variant: 'info',
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Đại diện tỉ lệ và câu chuyện New Zealand',
        description: 'Hệ thống PR là gì, ưu nhược điểm, và bài học từ quốc gia dám đổi hệ thống bầu cử',
        category: 'Chính trị học',
        estimatedReadTime: '7 phút',
        documentContent: {
          sections: [
            {
              heading: 'Đại diện tỉ lệ (Proportional Representation) là gì?',
              paragraphs: [
                'Proportional Representation (PR) là hệ thống trong đó phần trăm ghế trong quốc hội của mỗi đảng tương đương với phần trăm phiếu họ nhận được. Ví dụ: đảng nhận 30% phiếu → nhận 30% ghế quốc hội.',
                'PR thường đi kèm với multi-member districts (khu vực bầu cử có nhiều ghế), khác với single-member districts của FPTP. Đức, Thụy Điển, Israel, New Zealand dùng hình thức này.',
              ],
            },
            {
              heading: 'Ưu và nhược điểm của PR',
              paragraphs: [
                'Ưu điểm: các nhóm thiểu số vẫn có đại diện trong quốc hội tương xứng với tỉ lệ của họ trong xã hội; tránh được Spoiler Effect; khuyến khích nhiều đảng tham gia.',
                'Nhược điểm: thường dẫn đến đa đảng và chính phủ liên minh — các đảng phải thương lượng để lập chính phủ, đôi khi gây trì trệ. Israel là ví dụ cực đoan: chưa bao giờ có 1 đảng nào chiếm đa số, luôn phải lập liên minh phức tạp. Bỉ từng không có chính phủ trong 541 ngày (2010–2011).',
              ],
            },
            {
              heading: 'New Zealand — Quốc gia dám thay đổi',
              paragraphs: [
                'New Zealand dùng FPTP từ khi lập quốc (1853) đến tận năm 1996. Sau hai cuộc trưng cầu dân ý (1992 và 1993), đa số người dân quyết định chuyển sang MMP — Mixed-Member Proportional, hệ thống hỗn hợp mượn từ Đức.',
                'MMP hoạt động thế nào: mỗi cử tri bầu 2 phiếu — 1 phiếu cho ứng viên cụ thể ở khu vực (FPTP logic), 1 phiếu cho đảng yêu thích (proportional logic). Ghế quốc hội được phân chia theo tỉ lệ phiếu đảng, nhưng ứng viên địa phương vẫn có ghế riêng.',
                'Kết quả sau 30 năm MMP: số đại biểu phụ nữ trong Quốc hội tăng từ 21% (1993) lên 50%+ (2020); người Māori có đại diện chính thức; các đảng nhỏ có tiếng nói. New Zealand được xem là một trong những nền dân chủ đại diện nhất thế giới.',
              ],
            },
            {
              heading: 'Gerrymandering và PR',
              paragraphs: [
                'Với PR và multi-member districts, gerrymandering (vẽ lại ranh giới bầu cử có lợi) ít hiệu quả hơn nhiều so với FPTP. Vì ngay cả khi nhóm thiểu số bị "nhét" vào một quận, họ vẫn có thể giành được ghế tương ứng tỉ lệ của mình.',
                'Đây là một trong những lý do khiến nhiều nước chuyển từ FPTP sang hệ thống PR hoặc hệ thống hỗn hợp như MMP.',
              ],
            },
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — Bạn đã nắm được gì?',
        text: '✓ Two-round: nếu không ai đạt >50% ở vòng 1 → top 2 vào vòng 2; nhưng vẫn có thể xảy ra Spoiler Effect\n✓ Ví dụ Pháp 2002: cực hữu vào vòng 2 vì cánh tả chia phiếu → cử tri tả dồn phiếu cho Chirac (82.21%)\n✓ IRV: loại lần lượt ứng viên ít phiếu; cử tri không cần bầu chiến thuật; nhưng kiểm phiếu chậm hơn\n✓ IRV thực tế: Úc (1918), Maine (2018), Alaska (2022)\n✓ PR: tỉ lệ phiếu = tỉ lệ ghế → đại diện đa dạng nhưng dễ tạo liên minh phức tạp\n✓ New Zealand: chuyển thành công từ FPTP sang MMP (1996) — tăng đáng kể đại diện phụ nữ và thiểu số',
        variant: 'success',
      },
      {
        type: 'question',
        question: 'Tại sao Instant Runoff Voting (IRV) thường không được dùng để bầu tổng thống ở quy mô quốc gia lớn?',
        options: [
          { text: 'Vì nó không đảm bảo người có nhiều phiếu nhất thắng', isCorrect: false },
          { text: 'Vì nó quá phức tạp để cử tri hiểu cách xếp hạng', isCorrect: false },
          {
            text: 'Vì kiểm phiếu phức tạp và tốn thời gian hơn nhiều so với FPTP',
            isCorrect: true,
          },
          { text: 'Vì nó không giải quyết được Spoiler Effect', isCorrect: false },
        ],
        explanation:
          'IRV yêu cầu kiểm phiếu nhiều vòng — mỗi vòng loại 1 ứng viên và phân phối lại phiếu của họ theo thứ tự ưu tiên. Với hàng triệu lá phiếu và nhiều ứng viên, quá trình này cực kỳ tốn thời gian (NYC 2021 mất 2 tuần). Đây là lý do chính khiến IRV ít được áp dụng ở quy mô tổng thống quốc gia lớn.',
      },
      {
        type: 'text',
        title: 'Tổng kết — Và bài học tiếp theo',
        paragraphs: [
          'Mỗi hệ thống bầu cử đều có những đánh đổi: FPTP đơn giản nhưng Spoiler Effect; two-round đảm bảo đa số nhưng vẫn có thể bóp méo; IRV công bằng hơn nhưng chậm hơn ở quy mô lớn; PR đại diện đầy đủ hơn nhưng thường dẫn đến chính trị liên minh phức tạp.',
          'Nhưng chúng ta vẫn chưa nhắc đến một vấn đề khác: dù luật bầu cử như thế nào, người vẽ bản đồ địa lý vẫn có thể thao túng kết quả. Bài học tiếp theo: Gerrymandering — khi đường biên giới trở thành vũ khí chính trị.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LESSON 7: Gerrymandering — Vẽ bản đồ để thắng
  // Changes: FIX Shaw v. Reno "strict scrutiny", FIX NC 9/13 vs 10/13,
  //          + AI gerrymandering callout, + Efficiency Gap in library-doc
  // ─────────────────────────────────────────────────────────────────────────
  'danchu101-7': {
    title: 'Gerrymandering — Vẽ bản đồ để thắng',
    blocks: [
      {
        type: 'text',
        title: 'Trong bài học này bạn sẽ học được gì?',
        paragraphs: [
          'Hãy tưởng tượng bạn có thể định trước kết quả bầu cử mà không cần thay đổi một lá phiếu nào, không cần tuyên truyền hay vận động — chỉ cần vẽ lại đường biên giới trên bản đồ.',
          'Đây chính là Gerrymandering: nghệ thuật vẽ ranh giới các khu vực bầu cử để tối đa hoá lợi thế chính trị của một đảng. Nó được đặt tên từ năm 1812 và vẫn là một trong những vấn đề nhức nhối nhất của nền dân chủ hiện đại.',
          'Bài học này giải thích cách Gerrymandering hoạt động, lịch sử ra đời của nó, và tại sao nó khó bị loại bỏ ngay cả trong một nền dân chủ trưởng thành như Mỹ.',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Bối cảnh: Hạ viện Mỹ và Electoral Districts',
        text: 'Khi bầu Hạ viện Mỹ (House of Representatives), đất nước được chia thành các electoral districts (khu vực bầu cử). Mỗi district là một "single-member district" — chỉ 1 người thắng, theo luật FPTP winner-takes-all. Cứ 10 năm một lần (sau Census), ranh giới các district được vẽ lại theo sự thay đổi dân số.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Tại sao ranh giới lại quan trọng đến vậy?',
        paragraphs: [
          'Trong hệ thống single-member district, kết quả của mỗi quận phụ thuộc vào cơ cấu cử tri trong quận đó. Quận có đa số cử tri Cộng hòa → ứng viên Cộng hòa thắng. Quận có đa số Dân chủ → Dân chủ thắng.',
          'Vì vậy, người vẽ ranh giới quận có quyền lực rất lớn: họ có thể quyết định quận nào "an toàn" cho đảng nào, và quận nào sẽ là "chiến địa" cạnh tranh. Trong thực tế, ở nhiều bang nước Mỹ, chính các nhà lập pháp của đảng đang cầm quyền là người vẽ lại bản đồ — tức là họ vẽ bản đồ có lợi cho chính họ.',
          'Hai kỹ thuật chính của gerrymandering: "Packing" — nhét hết cử tri của đối thủ vào 1–2 quận (họ thắng to ở đó nhưng lãng phí phiếu), và "Cracking" — chia nhỏ cử tri của đối thủ ra nhiều quận khác nhau (đảm bảo họ là thiểu số ở mỗi quận).',
        ],
      },
      {
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/5/55/How_to_Steal_an_Election_-_Gerrymandering.svg',
        alt: 'Sơ đồ minh hoạ hai kỹ thuật gerrymandering: packing và cracking — cách vẽ ranh giới để định hình kết quả bầu cử',
        caption:
          'Minh hoạ kỹ thuật Gerrymandering: "Packing" (nhét cử tri đối thủ vào 1 quận) và "Cracking" (chia nhỏ cử tri đối thủ ra nhiều quận). Cùng một phân bổ cử tri, nhưng kết quả hoàn toàn khác nhau tùy cách vẽ ranh giới. Nguồn: Wikimedia Commons (Public Domain)',
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Nguồn gốc của từ "Gerrymandering"',
        text: 'Năm 1812, Thống đốc bang Massachusetts — ông Elbridge Gerry (1744–1814) — ký một dự luật vẽ lại ranh giới bầu cử bang theo hướng có lợi cho đảng của ông. Ranh giới kỳ lạ nhấp nhô này tạo ra một quận có hình dạng giống con kỳ nhông (salamander). Tờ Boston Gazette ghép tên ông (Gerry) với "salamander" thành "Gerrymander" — và từ đó thuật ngữ này ra đời, tồn tại cho đến ngày nay.\n\nThú vị là: Gerry sau đó trở thành Phó Tổng thống thứ 5 của Mỹ (1813–1814) và mất ngay khi đang tại chức.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Tại sao Gerrymandering khó bị loại bỏ?',
        paragraphs: [
          'Một trong những lý do gerrymandering dai dẳng là vì: trong hệ thống dân chủ, chính những người hưởng lợi từ nó lại là người quyết định có thay đổi nó hay không. Đảng đang cầm quyền sẽ không tự nguyện từ bỏ lợi thế của mình.',
          'Năm 2019, Tòa án Tối cao Mỹ phán quyết trong Rucho v. Common Cause (5-4) rằng gerrymandering vì lý do đảng phái (partisan gerrymandering) là vấn đề chính trị, không thuộc thẩm quyền của tòa án liên bang giải quyết — để lại cho từng bang tự xử lý. Đây là bước lùi lớn với các nhà cải cách.',
          'Với racial gerrymandering (dùng chủng tộc làm yếu tố chủ đạo khi vẽ bản đồ), tòa án có thể can thiệp — Shaw v. Reno (1993) đặt ra yêu cầu "strict scrutiny" (kiểm tra nghiêm ngặt) cho loại bản đồ này. Tuy nhiên, ranh giới giữa partisan và racial gerrymandering rất mờ nhạt trong thực tế.',
          'Giải pháp được nhiều nước áp dụng là thành lập "independent redistricting commissions" — ủy ban độc lập vẽ lại ranh giới, không bao gồm các chính trị gia đương nhiệm. Arizona (2000), California (2010), Michigan (2018) đã áp dụng mô hình này.',
        ],
      },
      {
        type: 'callout',
        icon: 'warning',
        title: 'AI và Algorithmic Gerrymandering — Thách thức thế kỷ 21',
        text: 'Nếu gerrymandering tay đã nguy hiểm, gerrymandering bằng máy tính còn đáng sợ hơn nhiều.\n\nPhần mềm hiện đại có thể tạo ra hàng triệu bản đồ khác nhau trong vài giây và tự động chọn bản đồ tối ưu hoá lợi thế đảng phái. Chiến dịch REDMAP của Đảng Cộng hòa (2010) đã dùng dữ liệu và phần mềm để target chính xác các cơ quan lập pháp bang trước kỳ redistricting — và giúp Cộng hòa kiểm soát phần lớn bản đồ 2011.\n\nNhưng công nghệ cũng là vũ khí của bên cải cách: các tổ chức như FiveThirtyEight và Metric Geometry and Gerrymandering Group dùng thuật toán để phát hiện và chứng minh gerrymandering trước toà án.',
        variant: 'warning',
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Lịch sử, Efficiency Gap và các trường hợp nổi tiếng',
        description: 'Từ bản đồ kỳ nhông 1812 đến thuật toán đo lường gerrymandering thế kỷ 21',
        category: 'Chính trị học',
        estimatedReadTime: '7 phút',
        documentContent: {
          sections: [
            {
              heading: 'Từ Elbridge Gerry đến hiện đại',
              paragraphs: [
                'Gerrymandering đã tồn tại ở mọi thời đại và mọi đảng phái. Ví dụ nổi tiếng: bang North Carolina sau khi Cộng hòa kiểm soát cơ quan lập pháp (2010), đã vẽ lại bản đồ cho bầu cử 2012: Cộng hòa giành 9/13 ghế Hạ viện dù chỉ nhận ~49% phiếu phổ thông. Đến bầu cử 2014, con số này tăng lên 10/13 ghế — chênh lệch còn lớn hơn.',
                'Cả Dân chủ lẫn Cộng hòa đều làm gerrymandering khi có cơ hội. Maryland (kiểm soát bởi Dân chủ) đã vẽ bản đồ quận 6 kỳ lạ để biến một quận Cộng hòa an toàn thành quận Dân chủ năm 2011.',
              ],
            },
            {
              heading: 'Efficiency Gap — Đo lường gerrymandering bằng toán học',
              paragraphs: [
                'Nicholas Stephanopoulos và Eric McGhee (2014) đề xuất "Efficiency Gap" — chỉ số đo lường mức độ gerrymandering. Ý tưởng: đếm "wasted votes" (phiếu thừa của bên thắng + toàn bộ phiếu của bên thua ở mỗi quận), rồi so sánh tỉ lệ phiếu lãng phí giữa 2 đảng.',
                'Nếu Efficiency Gap lớn → một đảng đang có lợi thế bất công trong phân bổ phiếu. Ví dụ: Wisconsin 2012 — Efficiency Gap của Cộng hòa là 13%, nghĩa là Cộng hòa lãng phí ít phiếu hơn Dân chủ đáng kể, cho thấy bản đồ được thiết kế có chủ đích.',
                'Chỉ số này đã được dùng làm bằng chứng trong nhiều vụ kiện tại tòa — mặc dù Tòa Tối cao chưa chấp nhận nó là tiêu chuẩn pháp lý chính thức.',
              ],
            },
            {
              heading: 'Racial Gerrymandering và Shaw v. Reno',
              paragraphs: [
                'Shaw v. Reno (1993) là vụ kiện quan trọng về racial gerrymandering. Tòa Tối cao phán quyết 5-4: khi ranh giới bầu cử có hình dạng kỳ lạ rõ ràng là do chủng tộc, cử tri có thể kiện vi phạm Equal Protection Clause. Đây không phải "cấm" racial gerrymandering — mà là đặt ra tiêu chuẩn "strict scrutiny" (kiểm tra nghiêm ngặt).',
                'Trong một số trường hợp, Đạo luật Quyền Bầu cử (Voting Rights Act) thực ra yêu CẦU phải tính đến chủng tộc khi vẽ bản đồ — để đảm bảo các cộng đồng thiểu số có đủ số lượng cử tri trong ít nhất một số quận để bầu ra đại diện của mình. Ranh giới giữa "vẽ bản đồ để đảm bảo đại diện thiểu số" và "racial gerrymandering vi hiến" rất mờ nhạt.',
              ],
            },
            {
              heading: 'Giải pháp thay thế',
              paragraphs: [
                'Nhiều nước dùng hệ thống independent redistricting commissions để tách việc vẽ bản đồ ra khỏi chính trị đảng phái. Canada, Anh, Úc đều có cơ quan độc lập làm việc này — gerrymandering gần như không tồn tại ở các nước này.',
                'Ở Mỹ, phong trào cải cách đang dần thành công ở cấp bang: Arizona (2000), California (2010), Michigan (2018) đã thành lập ủy ban độc lập. Tuy nhiên, hiến pháp Mỹ trao quyền redistricting cho cơ quan lập pháp bang — thay đổi phải diễn ra từng bang một, không thể áp dụng toàn quốc cùng lúc.',
              ],
            },
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — Bạn đã nắm được gì?',
        text: '✓ Gerrymandering: vẽ lại ranh giới electoral districts để tối đa hoá lợi thế của một đảng\n✓ Packing: nhét cử tri đối thủ vào 1 quận để "lãng phí" phiếu của họ\n✓ Cracking: chia nhỏ cử tri đối thủ ra nhiều quận để họ là thiểu số ở khắp nơi\n✓ Nguồn gốc: Thống đốc Elbridge Gerry, Massachusetts, 1812\n✓ Shaw v. Reno 1993: yêu cầu "strict scrutiny" cho racial gerrymandering (không phải cấm hoàn toàn)\n✓ Rucho 2019: toà liên bang không can thiệp partisan gerrymandering → từng bang tự xử lý\n✓ Giải pháp: independent commissions + thuật toán đo Efficiency Gap',
        variant: 'success',
      },
      {
        type: 'question',
        question: 'Kỹ thuật "Cracking" trong gerrymandering hoạt động như thế nào?',
        options: [
          { text: 'Chia nhỏ địa bàn của đối thủ ra nhiều quận để họ là thiểu số ở khắp nơi', isCorrect: true },
          { text: 'Nhét hết cử tri đối thủ vào 1 quận để họ thắng to nhưng lãng phí phiếu', isCorrect: false },
          { text: 'Xóa bỏ hoàn toàn các quận có lợi cho đối thủ', isCorrect: false },
          { text: 'Giảm số ghế của các quận đông cử tri đối thủ', isCorrect: false },
        ],
        explanation:
          '"Cracking" chia nhỏ một cộng đồng cử tri của đối thủ ra nhiều quận khác nhau. Kết quả: ở mỗi quận, họ là thiểu số và thua. So với "Packing" (nhét vào 1 quận) — hai kỹ thuật ngược nhau nhưng cùng mục đích giảm đại diện của đối thủ.',
      },
      {
        type: 'text',
        title: 'Tổng kết — Và bài học tiếp theo',
        paragraphs: [
          'Gerrymandering cho thấy rằng nền dân chủ không chỉ phụ thuộc vào luật bầu cử — mà còn phụ thuộc vào cách địa lý được định hình. Cùng một tập hợp cử tri, cùng một luật bầu cử, nhưng chỉ cần thay đổi đường biên giới là có thể thay đổi hoàn toàn kết quả.',
          'Nhưng đây chưa phải là cú đấm cuối cùng vào ý tưởng "hệ thống bầu cử hoàn hảo". Bài học tiếp theo sẽ giới thiệu định lý Arrow — chứng minh về mặt toán học rằng không bao giờ tồn tại một hệ thống bầu cử hoàn hảo, và hệ thống Electoral College của Mỹ là minh hoạ cho những đánh đổi khó tránh này.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LESSON 8: Định lý Arrow — Không có hệ thống bầu cử hoàn hảo
  // Changes: FIX NPVIC date-stamp, + Swing States callout,
  //          + Gibbard-Satterthwaite section in library-doc
  // ─────────────────────────────────────────────────────────────────────────
  'danchu101-8': {
    title: 'Định lý Arrow — Không có hệ thống bầu cử hoàn hảo',
    blocks: [
      {
        type: 'text',
        title: 'Trong bài học này bạn sẽ học được gì?',
        paragraphs: [
          'Chúng ta đã khám phá nhiều hệ thống bầu cử: FPTP, two-round, IRV, proportional representation. Câu hỏi tự nhiên là: liệu có hệ thống nào đáp ứng được tất cả các tiêu chí công bằng không?',
          'Năm 1951, nhà kinh tế học Kenneth Arrow trả lời câu hỏi này bằng một định lý toán học: KHÔNG. Không bao giờ tồn tại một hệ thống bầu cử vừa dân chủ vừa thỏa mãn tất cả các tiêu chí hợp lý. Đây là Arrow Impossibility Theorem — công trình đoạt giải Nobel của ông.',
          'Bài học cuối Level 2 này cũng khám phá Electoral College của Mỹ — một ví dụ thực tế cho những đánh đổi không thể tránh khỏi mà Định lý Arrow đã tiên đoán.',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Kenneth Arrow và Social Choice Theory',
        text: 'Kenneth Arrow (1921–2017) là nhà kinh tế học Mỹ, đoạt giải Nobel Kinh tế năm 1972 (chia sẻ với John Hicks). Luận án tiến sĩ của ông tại Columbia (1950), xuất bản thành sách năm 1951 (Social Choice and Individual Values), đặt câu hỏi: liệu có cách nào tổng hợp ý kiến cá nhân thành ý kiến tập thể một cách "hợp lý và dân chủ"? Câu trả lời: không, nếu có từ 3 lựa chọn trở lên.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Ba tiêu chí của Arrow cho một hệ thống bầu cử "lý tưởng"',
        paragraphs: [
          'Arrow đặt ra 3 điều kiện mà ông cho là một hệ thống bầu cử dân chủ và hợp lý nên thỏa mãn:',
          '1. Unrestricted Domain (tính phổ quát): hệ thống phải hoạt động được trong mọi tình huống, bất kể các cá nhân có ý kiến và thứ tự ưu tiên như thế nào.\n\n2. Pareto / Consensus condition (đồng thuận): nếu tất cả mọi người đều thích A hơn B, thì kết quả tập thể phải là A — không được là B.\n\n3. Independence of Irrelevant Alternatives (tính độc lập): thái độ của tập thể đối với A vs B chỉ nên phụ thuộc vào ý kiến về A và B, không bị ảnh hưởng bởi sự có mặt của ứng viên thứ C. (Ví dụ: thái độ của cử tri với Hillary vs Bernie không nên thay đổi chỉ vì có Trump tham gia.)',
          'Ba tiêu chí này nghe rất hợp lý — hầu như ai cũng đồng ý đây là những điều kiện tối thiểu của một hệ thống công bằng.',
        ],
      },
      {
        type: 'callout',
        icon: 'warning',
        title: 'Kết luận gây sốc của Arrow',
        text: 'Arrow chứng minh rằng: thể chế duy nhất thỏa mãn cả 3 điều kiện trên là chế độ "độc tài" — tức là tồn tại 1 cá nhân mà ý kiến chủ quan của người đó quyết định kết quả cuối cùng, bất kể ý kiến của mọi người khác.\n\n"Độc tài" ở đây không nhất thiết là nhà độc tài chính trị — mà là bất kỳ người nào mà ý kiến của họ quyết định toàn bộ kết quả tập thể, kể cả khi họ không biết mình đang làm vậy.',
        variant: 'warning',
      },
      {
        type: 'text',
        title: 'Không hoàn hảo — nhưng phải chọn hy sinh cái gì?',
        paragraphs: [
          'Arrow Impossibility Theorem không nói rằng dân chủ là vô nghĩa. Nó nói rằng: trong mọi hệ thống bầu cử, chúng ta phải chọn hy sinh ít nhất một trong các tiêu chí. Câu hỏi là: hy sinh cái gì sẽ tốt nhất cho xã hội đó?',
          'Ở Mỹ, hệ thống FPTP cộng Electoral College: có tính phổ quát (hoạt động trong mọi tình huống), có tính đồng thuận (tạo ra kết quả rõ ràng, tránh xung đột), nhưng mất tính độc lập — người Mỹ bị mắc kẹt trong "lesser of two evils" (chọn cái ít tệ hơn) thay vì được tự do chọn ứng viên thật sự yêu thích.',
        ],
      },
      {
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/ElectoralCollege2024.svg',
        alt: 'Bản đồ Electoral College Mỹ 2024 — số phiếu đại cử tri của từng bang',
        caption:
          'Electoral College 2024: mỗi bang có số phiếu đại cử tri tương ứng số đại biểu trong Quốc hội. California: 54 phiếu, Vermont: 3 phiếu — tỉ lệ đại diện per-capita rất khác nhau. Nguồn: Wikimedia Commons (Public Domain)',
      },
      {
        type: 'text',
        title: 'Electoral College — Hệ thống "1 mình 1 kiểu" của Mỹ',
        paragraphs: [
          'Electoral College (Đại cử tri đoàn) là hệ thống bầu tổng thống Mỹ — và Mỹ là quốc gia duy nhất trên thế giới dùng cơ chế này. Người dân Mỹ không bầu trực tiếp tổng thống; họ bầu "đại cử tri" (electors) của bang mình. Các đại cử tri này mới là người chính thức bầu tổng thống.',
          'Tổng số: 538 đại cử tri (435 hạ nghị sĩ + 100 thượng nghị sĩ + 3 cho Washington DC). Ứng viên cần ít nhất 270 phiếu để thắng. Và ở 48/50 bang, luật là "winner-takes-all" — ai thắng bang đó lấy toàn bộ phiếu đại cử tri.',
          'Hệ quả: có thể thắng tổng thống dù thua phổ thông phiếu trên toàn quốc. Năm 2016: Hillary Clinton hơn Trump ~2.87 triệu phiếu phổ thông — nhưng Trump thắng 306-232 đại cử tri (trước khi kiểm đếm faithless electors).',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Bất bình đẳng trong Electoral College',
        text: 'California: ~40 triệu dân, 54 đại cử tri → 1 đại cử tri đại diện ~740,000 người.\nVermont: ~647,000 dân, 3 đại cử tri → 1 đại cử tri đại diện ~215,000 người.\n\nTức là 1 phiếu bầu ở Vermont có giá trị gấp ~3.4 lần 1 phiếu bầu ở California trong cuộc bầu cử tổng thống. Đây là hậu quả trực tiếp từ cách Thượng viện phân bổ 2 ghế cho mỗi bang bất kể dân số.',
        variant: 'info',
      },
      {
        type: 'callout',
        icon: 'warning',
        title: '"Swing States" — Khi 7 bang quyết định số phận 330 triệu người',
        text: 'Do hệ thống winner-takes-all, các bang "an toàn" gần như bị bỏ qua trong chiến dịch tranh cử. California (54 phiếu) luôn xanh Dân chủ, Texas (40 phiếu) luôn đỏ Cộng hòa — ứng viên không cần vận động ở đó.\n\nToàn bộ cuộc đua tập trung vào ~7-10 "swing states": Pennsylvania, Wisconsin, Michigan, Arizona, Georgia, Nevada, North Carolina. Kết quả:\n• Cử tri ở swing states được hứa hẹn và quan tâm nhiều hơn\n• Chính sách ưu tiên ngành công nghiệp của swing states (thép ở PA, ô tô ở MI, nông nghiệp ở IA)\n• Người dân ở 40 bang "an toàn" bị bỏ qua hoàn toàn',
        variant: 'warning',
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Lịch sử Electoral College, cải cách, và Định lý Gibbard-Satterthwaite',
        description: 'Tại sao founding fathers chọn Electoral College — và tại sao không có hệ thống nào chống được chiến thuật',
        category: 'Chính trị học',
        estimatedReadTime: '8 phút',
        documentContent: {
          sections: [
            {
              heading: 'Tại sao Electoral College được thiết kế ra?',
              paragraphs: [
                'Năm 1787, khi viết Hiến pháp, các "founding fathers" đối mặt với 3 bài toán: (1) Không để quốc hội bầu tổng thống — tổng thống sẽ bị chi phối và mất tính độc lập; (2) Không để dân bầu trực tiếp — thông tin liên lạc thời 1787 rất chậm, tin tức từ Virginia có thể mất nhiều ngày đến Massachusetts; (3) Bảo vệ quyền của các bang nhỏ trong liên bang.',
                'Electoral College là giải pháp trung gian: người dân bầu ra các "đại cử tri" được tin tưởng, những người này sẽ bầu tổng thống. Các bang nhỏ được bảo đảm tối thiểu 3 đại cử tri (2 thượng nghị sĩ + 1 hạ nghị sĩ), không bị bang lớn lấn át. Ba lý do này đều đã thay đổi căn bản trong 230 năm qua.',
              ],
            },
            {
              heading: '"Swing states" và hệ quả chính sách',
              paragraphs: [
                'Do hệ thống winner-takes-all, các bang "an toàn" (luôn luôn bỏ phiếu cho 1 đảng) không được ứng viên quan tâm nhiều. Toàn bộ chiến dịch tập trung vào ~7-10 "swing states" — nơi kết quả có thể nghiêng về bất kỳ phía nào.',
                'Nghiên cứu cho thấy: tổng thống Mỹ có xu hướng ban hành chính sách có lợi cho swing states nhiều hơn các bang khác. Trợ cấp nông nghiệp, bảo vệ ngành thép, hay đầu tư cơ sở hạ tầng thường tập trung vào các bang chiến trường — cho dù từ góc độ kinh tế quốc gia, đó không phải phân bổ tối ưu.',
              ],
            },
            {
              heading: 'Đề xuất cải cách Electoral College',
              paragraphs: [
                'National Popular Vote Interstate Compact (NPVIC): thỏa thuận giữa các bang — khi đủ 270+ đại cử tri tham gia, các bang này sẽ trao toàn bộ đại cử tri cho ứng viên thắng phổ thông phiếu toàn quốc, bất kể kết quả ở bang đó. Tính đến 2024, 17 bang + DC đã tham gia (tổng ~209 đại cử tri) — vẫn chưa đủ 270.',
                'Đổi sang proportional allocation: thay vì winner-takes-all, phân bổ đại cử tri theo tỉ lệ phiếu. Maine và Nebraska là 2 bang duy nhất đã áp dụng một phần hệ thống này — và Maine thực sự bị chia phiếu trong cả 2020 lẫn 2024.',
              ],
            },
            {
              heading: 'Định lý Gibbard-Satterthwaite — Không thể chống chiến thuật',
              paragraphs: [
                'Arrow chứng minh không có hệ thống bầu cử nào vừa dân chủ vừa "công bằng". Alan Gibbard (1973) và Mark Satterthwaite (1975) — hai nhà khoa học độc lập — đã chứng minh thêm một điều đáng lo ngại hơn: trong mọi hệ thống bầu cử với 3+ ứng viên, luôn tồn tại tình huống mà cử tri có lợi hơn khi bầu không theo ý thích thật sự của mình.',
                'Nói cách khác: không có hệ thống bầu cử nào hoàn toàn "strategy-proof" (chống được chiến thuật). Trong mọi hệ thống, tactical voting luôn có thể xuất hiện và đôi khi là lựa chọn hợp lý. Kết hợp Arrow + Gibbard-Satterthwaite: không có hệ thống nào vừa công bằng, vừa chống được chiến thuật — đây là giới hạn toán học của bất kỳ nền dân chủ nào.',
              ],
            },
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — Bạn đã nắm được gì?',
        text: '✓ Arrow đặt ra 3 tiêu chí: phổ quát, đồng thuận, độc lập\n✓ Định lý Arrow: không tồn tại hệ thống bầu cử nào vừa dân chủ vừa thỏa mãn cả 3 tiêu chí\n✓ Mọi hệ thống đều phải hy sinh ít nhất 1 tiêu chí → không có hệ thống hoàn hảo\n✓ Electoral College: 538 đại cử tri, cần 270 để thắng; winner-takes-all ở 48 bang\n✓ Bất bình đẳng: 1 phiếu ở Vermont ≈ 3.4 phiếu ở California\n✓ Swing states: ~7-10 bang quyết định kết quả — 40 bang còn lại bị bỏ qua\n✓ Gibbard-Satterthwaite: không hệ thống nào hoàn toàn chống được tactical voting',
        variant: 'success',
      },
      {
        type: 'question',
        question: 'Theo Định lý Arrow, điều gì là ĐÚNG về các hệ thống bầu cử dân chủ?',
        options: [
          { text: 'Luôn tồn tại một hệ thống bầu cử hoàn hảo nếu thiết kế đủ thông minh', isCorrect: false },
          { text: 'Không có hệ thống nào hoạt động được khi có từ 3 ứng viên trở lên', isCorrect: false },
          {
            text: 'Mọi hệ thống dân chủ đều phải chấp nhận hy sinh ít nhất một trong các tiêu chí lý tưởng',
            isCorrect: true,
          },
          { text: 'Chỉ có hệ thống độc tài mới có thể đưa ra quyết định nhất quán', isCorrect: false },
        ],
        explanation:
          'Arrow chứng minh rằng không tồn tại hệ thống bầu cử nào đáp ứng đồng thời: tính phổ quát, đồng thuận, và tính độc lập — trừ khi đó là chế độ "độc tài" (1 người quyết định tất cả). Vì vậy, mọi hệ thống dân chủ đều phải chấp nhận hy sinh ít nhất một tiêu chí, và câu hỏi là "hy sinh cái nào sẽ tốt nhất cho xã hội đó".',
      },
      {
        type: 'text',
        title: 'Tổng kết Level 2 — Và cái nhìn về Level 3',
        paragraphs: [
          'Trong Level 2, chúng ta đã đi qua hành trình của phiếu bầu: từ nghịch lý Condorcet (ý chí tập thể không phải lúc nào cũng nhất quán), qua FPTP và Spoiler Effect, đến two-round và IRV, gerrymandering, và cuối cùng là Định lý Arrow — chứng minh toán học rằng không có hệ thống nào hoàn hảo.',
          'Nhưng bầu cử chỉ là một phần của câu đố. Ngay cả khi bầu ra được lãnh đạo tốt, làm thế nào để ngăn chặn họ tích tụ quá nhiều quyền lực? Làm thế nào để đảm bảo không ai — dù được bầu lên một cách hợp pháp — có thể trở thành nhà độc tài?',
          'Level 3 sẽ khám phá câu trả lời của khoa học chính trị phương Tây: tam quyền phân lập, liên bang, checks and balances, và nghị viện lưỡng viện — những thiết chế được thiết kế để không ai có thể thâu tóm quá nhiều quyền lực.',
        ],
      },
    ],
  },
};

// ─────────────────────────────────────────────
// Main function
// ─────────────────────────────────────────────
async function main() {
  console.log('🗳️  Updating Level 2 content for "Của dân, do dân, vì dân"');
  console.log('   (fact-check fixes + enrichment — all in one pass)');
  console.log('='.repeat(60));

  const slugs = Object.keys(level2UpdatedContents);
  console.log(`\nUpdating ${slugs.length} lessons: ${slugs.join(', ')}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const slug of slugs) {
    const content = level2UpdatedContents[slug];
    try {
      const lesson = await prisma.lesson.findUnique({ where: { slug } });
      if (!lesson) {
        console.log(`  ⚠️  Lesson "${slug}" not found in database — skipping`);
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
  console.log(`✅ Level 2 update complete!`);
  console.log(`   Success: ${successCount} lessons`);
  if (errorCount > 0) console.log(`   Errors:  ${errorCount} lessons`);
  console.log('\n📋 Changes summary:');
  console.log('   FIXES: Duverger 2013, Perot ~18.91%, Oscar→Best Picture,');
  console.log('          Shaw v. Reno strict scrutiny, NC 9/13 (2012) vs 10/13 (2014+)');
  console.log('   NEW CONTENT: Borda Count, Condorcet in practice, UK/Canada FPTP,');
  console.log('          IRV real elections, NZ MMP, AI gerrymandering, Efficiency Gap,');
  console.log('          Swing States, Gibbard-Satterthwaite');
}

main()
  .catch((e) => {
    console.error('Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
