/**
 * Phase 4: Add Level 4 content for "Của dân, do dân, vì dân" (dan-chu-101)
 *
 * Level 4: Văn hoá dân chủ — Hành trình của quyền bầu cử (transcript ~60:21–75:00)
 *   - danchu101-13: Bỏ phiếu công khai vs Bỏ phiếu bí mật
 *   - danchu101-14: Lịch sử quyền bầu cử ở Mỹ
 *   - danchu101-15: Dân chủ — Hiện tượng bất thường cần bảo vệ
 *
 * Run: cd tepup && npx tsx scripts/add-danchu101-level4.ts
 */

import 'dotenv/config';
import { prisma } from '../lib/prisma';

const level4Contents: Record<string, { title: string; blocks: any[] }> = {
  // ────────────────────────────────────────────────────────────────
  // LESSON 13: Bỏ phiếu công khai vs Bỏ phiếu bí mật
  // ────────────────────────────────────────────────────────────────
  'danchu101-13': {
    title: 'Bỏ phiếu công khai vs Bỏ phiếu bí mật',
    blocks: [
      {
        type: 'text',
        title: 'Trong bài học này bạn sẽ học được gì?',
        paragraphs: [
          'Chúng ta đã biết ai được bầu (lập pháp, hành pháp, tư pháp), ai có quyền bầu (cử tri), và bầu như thế nào (FPTP, hai vòng, bầu ưu tiên). Nhưng còn một câu hỏi nền tảng hơn nữa: bỏ phiếu như thế nào — công khai hay bí mật?',
          'Câu trả lời tưởng như hiển nhiên ngày nay, nhưng thực ra là kết quả của cả một hành trình đầy bất ngờ và nghịch lý. Bài học này kể câu chuyện về cách người Mỹ thế kỷ 18 đã bỏ phiếu — và tại sao cái "tiến bộ" đôi khi lại tạo ra bất công mới.',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Voice Vote — Bỏ phiếu bằng giọng nói (thế kỷ 18–19)',
        text: 'Năm 1788, khi nước Mỹ tổ chức cuộc bầu cử tổng thống đầu tiên, công nghệ in ấn chưa phát triển — không có phiếu bầu in sẵn. Giải pháp: cử tri hô to tên ứng viên mình chọn, trước toàn bộ cộng đồng.\n\nĐây là hình thức bầu cử phổ biến nhất trong hơn 100 năm, từ thế kỷ 18 đến 19. Không bí mật, không riêng tư — mọi người đều nghe thấy lựa chọn của nhau.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Bầu cử như lễ hội — và những vấn đề của nó',
        paragraphs: [
          'Cuộc bầu cử đầu tiên của Mỹ năm 1788 chỉ có khoảng 43.000 cử tri — tức khoảng 1,8% dân số. Chỉ người da trắng có tài sản mới được bầu. Bầu cử được tổ chức như lễ hội: ở thành phố có diễu hành, diễn thuyết, tranh luận; ở nông thôn thì lồng ghép vào các phiên chợ huyện với ca hát, tiệc tùng suốt đêm.',
          'Nhưng "lễ hội" này cũng có mặt tối. Ngày trước bầu cử, George Washington đã mua 46 gallon bia, 35 gallon rượu rum, 2 gallon rượu táo và 3 lít rượu mạnh để đãi hàng xóm — với hy vọng họ sẽ đáp lại bằng lá phiếu ủng hộ. Khi ai đó vừa ăn tiệc nhà bạn xong mà bị buộc phải hô to lựa chọn trước đám đông... áp lực là có thật.',
          'Cũng có cách bỏ phiếu ít phổ biến hơn: dùng hạt ngũ cốc làm phiếu. Ngô = ứng viên A, đỗ xanh = ứng viên B, đậu phộng = ứng viên C. Nhưng vì cần kiểm tra ai bỏ hạt gì nên vẫn phải công khai — không thể giữ bí mật.',
        ],
      },
      {
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg',
        alt: 'Chân dung George Washington — vị tổng thống đầu tiên của Mỹ, được bầu năm 1788',
        caption:
          'George Washington — tổng thống đầu tiên của Mỹ (1789–1797), được bầu trong cuộc bầu cử công khai đầu tiên của quốc gia này. Theo ghi chép lịch sử, ông đã chi tiền mua rượu bia và thịt để vận động cử tri trước bầu cử — một tập tục phổ biến thời bấy giờ. Nguồn: Wikimedia Commons (Public Domain)',
      },
      {
        type: 'callout',
        icon: 'warning',
        title: 'Party Ticket — Phiếu màu của đảng',
        text: 'Khi công nghệ in ấn phát triển hơn, các đảng chính trị in phiếu bầu riêng — mỗi đảng một màu (Đảng Dân Chủ: xanh, Đảng Cộng Hòa: đỏ). Cử tri tự đến lấy phiếu của đảng mình ủng hộ và mang đến điểm bầu.\n\nHậu quả: Khi bạn đi bộ đến điểm bầu cử, tay cầm tờ phiếu màu đỏ, cả khu phố đã biết bạn bầu cho ai trước khi bạn bỏ phiếu. Các tổ chức đảng phái cử người đứng ở điểm bầu để phát phiếu — và đôi khi dùng áp lực (kể cả bạo lực) để thuyết phục người cầm phiếu sai màu đổi lại. Trong lịch sử Mỹ, bầu cử đã từng gây ra chết người.',
        variant: 'warning',
      },
      {
        type: 'text',
        title: 'Australian Ballot — Giải pháp từ phía đối diện Trái Đất',
        paragraphs: [
          'Sau hơn 100 năm bỏ phiếu công khai, đến năm 1890 nước Mỹ bắt đầu áp dụng "Australian Ballot" — phiếu bầu kiểu Úc. Tên gọi này vì Úc là nước đầu tiên trên thế giới áp dụng hình thức này.',
          'Với Australian Ballot: phiếu bầu do chính quyền in sẵn (không phải đảng in), cử tri đến điểm bầu cố định trong nhà kín, và điền lựa chọn trong phòng riêng tư. Lần đầu tiên trong lịch sử nước Mỹ, lá phiếu thực sự bí mật.',
          'Nghe có vẻ là bước tiến lớn. Nhưng thực tế đã diễn ra không như vậy.',
        ],
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Từ Voice Vote đến Australian Ballot',
        description: 'Hành trình 100 năm của nền dân chủ Mỹ từ bỏ phiếu công khai đến phòng phiếu bí mật, và những nghịch lý không ai ngờ tới',
        category: 'Lịch sử chính trị',
        estimatedReadTime: '5 phút',
        documentContent: {
          sections: [
            {
              heading: 'Voice vote — Bỏ phiếu bằng giọng nói (Viva voce)',
              paragraphs: [
                'Bỏ phiếu bằng giọng nói (viva voce) là hình thức bầu cử phổ biến nhất ở Mỹ từ 1788 đến cuối thế kỷ 19. Cử tri xướng to tên ứng viên trước mọi người, và kết quả được ghi chép bởi thư ký.',
                'Hình thức này có nguồn gốc từ nghị viện Anh — nơi các nghị sĩ vẫn còn hô "Aye" hay "Nay" để biểu quyết ngay cả ngày nay. Ở Mỹ đầu thế kỷ 19, đây là cách gần như duy nhất vì chi phí in ấn quá cao.',
              ],
            },
            {
              heading: 'Party Ticket — Phiếu đảng màu (1830s–1880s)',
              paragraphs: [
                'Khi kỹ thuật in phát triển, các đảng bắt đầu in phiếu bầu riêng, thường được phân biệt bằng màu sắc. Cử tri nhận phiếu từ đại diện đảng và bỏ vào thùng phiếu.',
                'Hệ thống này tạo ra nhiều vấn đề: (1) cử tri bị áp lực vì mọi người thấy họ cầm phiếu màu gì; (2) đảng phái có thể từ chối phát phiếu cho người không ủng hộ; (3) bạo lực ở điểm bầu cử xảy ra không hiếm.',
              ],
            },
            {
              heading: 'Australian Ballot (Secret Ballot) — 1890',
              paragraphs: [
                'Úc áp dụng bỏ phiếu bí mật từ giữa thế kỷ 19 (Victoria 1856). Mỹ bắt đầu áp dụng từ 1888–1890 khi Massachusetts là tiểu bang đầu tiên. Đến 1892, hầu hết các tiểu bang đã áp dụng.',
                'Nghịch lý: khi phiếu bầu do chính quyền in sẵn và cử tri phải đọc tên ứng viên trên phiếu, những người không biết chữ — thường là nông dân, người nghèo, người nhập cư — không thể bỏ phiếu một cách có ý nghĩa. Bầu bí mật vô tình tạo ra một "bài kiểm tra tập đọc" không tuyên bố.',
              ],
            },
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — Bạn đã nắm được gì?',
        text: '✓ Voice vote (1788–1890): hô to tên ứng viên — công khai, dễ bị ảnh hưởng\n✓ Party ticket: phiếu màu của đảng — mọi người biết bạn bầu cho ai từ xa\n✓ Mua phiếu: George Washington mua rượu; người nghèo đổi phiếu lấy sandwich\n✓ Australian ballot (1890): phiếu do nhà nước in, phòng phiếu bí mật\n✓ Nghịch lý: bỏ phiếu bí mật loại bỏ người không biết chữ — tiến bộ tạo ra bất công mới',
        variant: 'success',
      },
      {
        type: 'question',
        question: 'Tại sao việc áp dụng "Australian Ballot" (bỏ phiếu bí mật) ở Mỹ năm 1890 lại tạo ra bất công mới, dù mục đích ban đầu là bảo vệ cử tri?',
        options: [
          { text: 'Vì phiếu bầu bí mật làm khó khăn cho việc kiểm phiếu', isCorrect: false },
          {
            text: 'Vì cử tri phải biết đọc để điền phiếu in sẵn, làm người mù chữ mất quyền bầu cử hiệu quả',
            isCorrect: true,
          },
          { text: 'Vì các đảng không còn được phép in phiếu riêng', isCorrect: false },
          { text: 'Vì phòng phiếu bí mật quá đắt để xây dựng', isCorrect: false },
        ],
        explanation:
          'Khi phiếu bầu chuyển từ "hô to tên" sang "điền trên giấy", cử tri cần biết đọc để hiểu phiếu. Nhưng ở thế kỷ 19, tỷ lệ mù chữ rất cao — đặc biệt là nông dân, người nghèo, người nhập cư. Bỏ phiếu bí mật vô tình biến hành động bầu cử thành một bài kiểm tra biết chữ. Chỉ khi tỷ lệ biết chữ tăng cao thì bỏ phiếu bí mật mới thực sự bảo vệ được quyền bầu cử của tất cả mọi người.',
      },
      {
        type: 'text',
        title: 'Tổng kết — Và bài học tiếp theo',
        paragraphs: [
          'Câu chuyện về cách bỏ phiếu cho thấy: mỗi giải pháp đều có chi phí ẩn. Voice vote → bị ép buộc. Party ticket → bị đe dọa. Secret ballot → bị loại trừ vì không biết chữ. Không có hệ thống nào hoàn hảo — dân chủ là quá trình liên tục điều chỉnh để công bằng hơn.',
          'Bài học tiếp theo sẽ kể câu chuyện lớn hơn: ai thực sự có quyền bầu cử ở Mỹ — và cuộc đấu tranh kéo dài hơn 200 năm để mở rộng quyền đó cho tất cả mọi người.',
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // LESSON 14: Lịch sử quyền bầu cử ở Mỹ
  // ────────────────────────────────────────────────────────────────
  'danchu101-14': {
    title: 'Lịch sử quyền bầu cử ở Mỹ',
    blocks: [
      {
        type: 'text',
        title: 'Trong bài học này bạn sẽ học được gì?',
        paragraphs: [
          'Năm 1788, cuộc bầu cử tổng thống đầu tiên của Mỹ chỉ có 43.000 cử tri — tức khoảng 1,8% dân số. Chỉ những người đàn ông da trắng có tài sản mới được bầu. Phải mất hơn 200 năm và vô số cuộc đấu tranh — kể cả nội chiến đẫm máu — để quyền bầu cử mở rộng đến gần toàn bộ người dân Mỹ trưởng thành.',
          'Câu chuyện về quyền bầu cử ở Mỹ là câu chuyện về việc dân chủ không phải là điểm đến cố định mà là một hành trình liên tục — và mỗi bước mở rộng đều đến từ đấu tranh, không phải từ thiện chí tự nguyện.',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Điểm xuất phát — Mỹ 1788: 1,8% dân số có quyền bầu',
        text: 'Cuộc bầu cử tổng thống đầu tiên của Mỹ (1788–1789): Chỉ người đàn ông da trắng sở hữu đất đai mới được bầu. Tổng cộng khoảng 43.000 cử tri trên tổng số gần 3,9 triệu người — tức khoảng 1,8%.\n\nSo với ngày nay: cuộc bầu cử 2020 có 159 triệu người tham gia bỏ phiếu — tức khoảng 67% dân số trưởng thành.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Từ nô lệ đến công dân — Con đường đẫm máu',
        paragraphs: [
          'Sau khi Hiến pháp Mỹ được ký năm 1787, cần thêm gần 100 năm nữa — và một cuộc nội chiến khốc liệt (1861–1865) — để người Mỹ gốc Phi thoát khỏi chế độ nô lệ. Tu chính án thứ 13 (1865) xóa bỏ nô lệ. Tu chính án thứ 14 (1868) công nhận quyền công dân. Tu chính án thứ 15 (1870) cấm phân biệt quyền bầu cử theo chủng tộc.',
          'Nhưng thực tế vận hành khác xa luật pháp: các tiểu bang miền Nam áp dụng thuế thân (poll tax), bài kiểm tra đọc viết, và bạo lực để ngăn người da đen đi bầu. Phải đến Đạo luật Quyền Bầu cử năm 1965 (Voting Rights Act) — 100 năm sau nội chiến — các biện pháp bảo vệ liên bang mới thực sự có hiệu lực.',
          'Cuộc đấu tranh cho quyền bầu cử của người da đen ở Mỹ kéo dài từ 1865 đến 1965 — tức là 100 năm. Một thế kỷ đấu tranh chỉ để thực hiện điều đã được viết vào Hiến pháp.',
        ],
      },
      {
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Suffragette_City_NYC_1913.jpg',
        alt: 'Đoàn diễu hành ủng hộ quyền bầu cử cho phụ nữ tại New York, 1913',
        caption:
          'Phong trào đòi quyền bầu cử cho phụ nữ (Suffragette movement) ở Mỹ — một trong những phong trào xã hội lớn nhất đầu thế kỷ 20. Phụ nữ phải đấu tranh hơn 70 năm, từ Hội nghị Seneca Falls (1848) đến Tu chính án thứ 19 (1920), để giành được quyền bỏ phiếu. Nguồn: Wikimedia Commons',
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Quyền bầu cử cho phụ nữ — 72 năm đấu tranh',
        text: '1848: Hội nghị Seneca Falls — phong trào đòi quyền bầu cử cho phụ nữ chính thức ra đời, do Elizabeth Cady Stanton và Susan B. Anthony dẫn đầu.\n\n1920: Tu chính án thứ 19 — phụ nữ Mỹ chính thức có quyền bầu cử sau 72 năm đấu tranh.\n\nKhoảng cách: từ 1848 đến 1920 là 72 năm — gần 3 thế hệ. Nhiều người đã đấu tranh cả đời mà không sống để thấy ngày phụ nữ được bầu.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Dân chủ — Không bao giờ "hoàn thành"',
        paragraphs: [
          'Ngay cả ngày nay, quyền bầu cử ở Mỹ vẫn tiếp tục là chủ đề tranh cãi. Bầu cử 2020 chứng kiến những tranh luận về voter ID laws, hạn chế thời gian bỏ phiếu sớm, và đóng cửa điểm bỏ phiếu ở các khu vực dân số thiểu số — những vấn đề mà phía ủng hộ gọi là bảo vệ tính toàn vẹn bầu cử, còn phía phản đối gọi là voter suppression.',
          'Ngay cả ở nền dân chủ lâu đời và nổi tiếng nhất thế giới, câu hỏi "ai thực sự có quyền bầu cử, và bao nhiêu rào cản là quá nhiều?" vẫn chưa có câu trả lời cuối cùng.',
          'Kết luận của câu chuyện quyền bầu cử ở Mỹ không phải là "dân chủ đã được thiết lập xong". Kết luận là: dân chủ là một quá trình đang diễn ra, liên tục được tranh cãi, liên tục được mở rộng — hoặc thu hẹp — tùy theo sức mạnh tương đối của các lực lượng trong xã hội.',
        ],
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Các mốc lịch sử mở rộng quyền bầu cử tại Mỹ',
        description: 'Từ 1,8% cử tri năm 1788 đến 67% năm 2020 — hành trình hơn 200 năm qua các tu chính án, đạo luật và phong trào xã hội',
        category: 'Lịch sử Mỹ',
        estimatedReadTime: '6 phút',
        documentContent: {
          sections: [
            {
              heading: 'Giai đoạn 1: Nền tảng (1788–1860)',
              paragraphs: [
                '1788–1789: Cuộc bầu cử tổng thống đầu tiên. Chỉ khoảng 43.000 cử tri — người đàn ông da trắng có tài sản ở phần lớn các tiểu bang.',
                'Từ 1820s–1850s: Dần dần loại bỏ yêu cầu sở hữu tài sản, mở rộng quyền bầu cử cho tất cả người đàn ông da trắng. Nhưng người da đen, phụ nữ, và người bản địa vẫn bị loại trừ.',
              ],
            },
            {
              heading: 'Giai đoạn 2: Nội chiến và Tái thiết (1861–1877)',
              paragraphs: [
                'Tu chính án 13 (1865): Xóa bỏ chế độ nô lệ.',
                'Tu chính án 14 (1868): Công nhận quyền công dân cho tất cả người sinh ra hoặc nhập tịch tại Mỹ.',
                'Tu chính án 15 (1870): Cấm từ chối quyền bầu cử dựa trên chủng tộc, màu da, hay tình trạng nô lệ trước đây.',
                'Nhưng: các tiểu bang miền Nam phát triển "Jim Crow laws" — bao gồm poll tax (thuế thân), literacy test (bài kiểm tra đọc viết), và white primary (chỉ người da trắng bầu trong bầu cử sơ bộ của đảng Dân Chủ) — để vô hiệu hóa Tu chính án 15 trên thực tế.',
              ],
            },
            {
              heading: 'Giai đoạn 3: Phụ nữ và quyền bầu cử (1848–1920)',
              paragraphs: [
                '1848: Hội nghị Seneca Falls — Elizabeth Cady Stanton, Lucretia Mott và 300 người ký Tuyên ngôn cảm nghĩ (Declaration of Sentiments), đòi quyền bầu cử cho phụ nữ.',
                '1869: Wyoming là tiểu bang đầu tiên cho phép phụ nữ bầu cử.',
                '1920: Tu chính án 19 — phụ nữ Mỹ chính thức có quyền bầu cử trên toàn quốc, sau 72 năm vận động.',
              ],
            },
            {
              heading: 'Giai đoạn 4: Phong trào Dân Quyền và Hiện đại (1955–nay)',
              paragraphs: [
                '1965: Voting Rights Act (Đạo luật Quyền Bầu cử) — do Tổng thống Lyndon B. Johnson ký sau những cuộc biểu tình và bạo lực ở Selma, Alabama. Đạo luật cấm các biện pháp phân biệt đối xử trong bầu cử và yêu cầu liên bang giám sát các tiểu bang có lịch sử phân biệt.',
                '1971: Tu chính án 26 — hạ tuổi bầu cử từ 21 xuống 18, do sức ép từ thế hệ trẻ trong bối cảnh Chiến tranh Việt Nam.',
                '2020: Bầu cử tổng thống với 159 triệu phiếu — cao kỷ lục, nhưng vẫn còn tranh cãi về voter ID laws và voter suppression.',
              ],
            },
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Checkpoint — Bạn đã nắm được gì?',
        text: '✓ 1788: chỉ 1,8% dân số (người đàn ông da trắng có tài sản) có quyền bầu\n✓ Tu chính án 13/14/15 (1865–1870): xóa nô lệ, công nhận công dân, cấm phân biệt chủng tộc — nhưng Jim Crow laws vẫn vô hiệu hóa trên thực tế\n✓ 1920: Tu chính án 19 — phụ nữ có quyền bầu cử sau 72 năm đấu tranh\n✓ 1965: Voting Rights Act — bảo vệ liên bang thực sự có hiệu lực\n✓ Bài học: quyền bầu cử không được trao tặng — nó luôn phải giành lấy',
        variant: 'success',
      },
      {
        type: 'question',
        question: 'Mặc dù Tu chính án thứ 15 (1870) đã cấm phân biệt quyền bầu cử theo chủng tộc, người Mỹ gốc Phi ở miền Nam vẫn bị tước đoạt quyền bầu cử thực tế trong gần 100 năm tiếp theo. Tại sao?',
        options: [
          {
            text: 'Tu chính án 15 chỉ áp dụng ở miền Bắc, không có hiệu lực ở miền Nam',
            isCorrect: false,
          },
          {
            text: 'Các tiểu bang miền Nam áp dụng poll tax, literacy test và bạo lực để ngăn người da đen đi bầu trên thực tế, bất chấp luật liên bang',
            isCorrect: true,
          },
          { text: 'Người Mỹ gốc Phi tự nguyện không muốn tham gia bầu cử', isCorrect: false },
          {
            text: 'Tòa án Tối cao Mỹ đã tuyên bố Tu chính án 15 là vi hiến',
            isCorrect: false,
          },
        ],
        explanation:
          'Các tiểu bang miền Nam phát triển một loạt biện pháp để vô hiệu hóa Tu chính án 15 trên thực tế: poll tax (thuế phải đóng để được bầu, người nghèo không đủ tiền), literacy test (bài kiểm tra đọc viết được áp dụng có chọn lọc để loại người da đen), và bạo lực đe dọa. Phải đến Voting Rights Act năm 1965 — 95 năm sau Tu chính án 15 — các bảo vệ liên bang mới đủ mạnh để thực thi quyền bầu cử trên thực tế.',
      },
      {
        type: 'text',
        title: 'Tổng kết — Và bài học cuối cùng',
        paragraphs: [
          'Hành trình 200 năm của quyền bầu cử ở Mỹ dạy một bài học đơn giản nhưng sâu sắc: dân chủ không phải là một sự kiện, mà là một quá trình. Không có khoảnh khắc nào mà "dân chủ đã hoàn thành". Nó luôn là đối tượng của đấu tranh và phản đấu tranh.',
          'Bài học cuối cùng của khóa học sẽ tổng kết tất cả những gì chúng ta đã học — và đặt ra câu hỏi lớn nhất: Tại sao dân chủ, với tất cả những khiếm khuyết của nó, vẫn là một "hiện tượng bất thường" đáng bảo vệ?',
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // LESSON 15: Dân chủ — Hiện tượng bất thường cần bảo vệ
  // ────────────────────────────────────────────────────────────────
  'danchu101-15': {
    title: 'Dân chủ — Hiện tượng bất thường cần bảo vệ',
    blocks: [
      {
        type: 'text',
        title: 'Trong bài học này bạn sẽ học được gì?',
        paragraphs: [
          'Tên của podcast này là "Oddly Normal" — "Bất thường một cách bình thường". Và chủ đề của tập này là dân chủ. Đó không phải ngẫu nhiên.',
          'Chúng ta đã đi qua rất nhiều khái niệm: 4 loại thể chế, nghịch lý Condorcet, gerrymandering, tam quyền phân lập, checks and balances, lưỡng viện, voice vote, Australian ballot, và hành trình của quyền bầu cử. Bài học cuối này tổng kết tất cả — và trả lời câu hỏi: Tại sao dân chủ lại "bất thường"? Và tại sao điều đó quan trọng?',
        ],
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Dân chủ — Thiểu số trong lịch sử nhân loại',
        text: 'Nhìn vào toàn bộ lịch sử loài người: đại đa số con người, trong đại đa số thời gian, đã sống dưới các thể chế phi dân chủ — quân chủ, thần quyền, đế chế, độc tài.\n\nDân chủ hiện đại (theo nghĩa phổ thông đầu phiếu) chỉ thực sự bắt đầu từ khoảng cuối thế kỷ 19. Và ngay cả hôm nay, theo nhiều chỉ số, chỉ khoảng 40–50% dân số thế giới sống trong các nền dân chủ được coi là "tự do".\n\nDân chủ không phải trạng thái tự nhiên của xã hội người. Nó là một thí nghiệm vẫn đang tiếp diễn.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Văn hóa dân chủ — Nền tảng mà các cơ chế không thể thay thế',
        paragraphs: [
          'Alexis de Tocqueville — nhà tư tưởng người Pháp quan sát nước Mỹ đầu thế kỷ 19 — đã phát hiện ra điều mà không thể giải thích chỉ bằng luật pháp hay cơ chế: văn hóa dân chủ.',
          'Ông quan sát thấy ở Mỹ: các tổ chức xã hội dân sự hoạt động rất sôi nổi, người dân tự nguyện lập hội và tham gia vào các vấn đề cộng đồng. Tinh thần "Good Samaritan" — người ta cảm thấy có trách nhiệm với người xung quanh, không chỉ với gia đình mình. Và "township democracy" — dân chủ tại địa phương, nơi người dân tham gia trực tiếp vào các quyết định của thị trấn mình sống.',
          'Tocqueville gọi đây là "cultural capital" — nguồn vốn văn hóa. Không có cơ chế bầu cử nào, không có hệ thống phân quyền nào có thể hoạt động tốt nếu không có cái nền văn hóa này. Ngược lại, một xã hội có văn hóa tham gia, trách nhiệm, và tự do thì dân chủ sẽ tồn tại ngay cả khi các cơ chế còn thô sơ.',
        ],
      },
      {
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Democracy_Index_2022_complete.svg',
        alt: 'Bản đồ Chỉ số Dân chủ 2022 — cho thấy phân bố không đồng đều của nền dân chủ trên thế giới',
        caption:
          'Democracy Index 2022 (Economist Intelligence Unit) — bản đồ chỉ số dân chủ toàn cầu. Màu xanh đậm: nền dân chủ đầy đủ. Màu vàng/cam: nền dân chủ khiếm khuyết. Màu đỏ: chế độ độc đoán. Dân chủ thực sự là thiểu số trên bản đồ thế giới. Nguồn: Wikimedia Commons (CC BY-SA)',
      },
      {
        type: 'callout',
        icon: 'info',
        title: 'Game of Thrones và câu hỏi về quyền lực',
        text: 'Trong Game of Thrones, Varys hỏi Tyrion: "Ba người đàn ông vĩ đại cùng ngồi trong một căn phòng — một vị vua, một thầy tu, và một người giàu có. Đứng giữa họ là một kiếm sĩ diết thuê. Mỗi người trong ba người kia ra giá để kiếm sĩ giết hai kẻ còn lại. Ai sống, ai chết — phụ thuộc vào tay kiếm sĩ. Vậy thì... quyền lực nằm ở đâu?"\n\nTyrion đã đúng khi trả lời: "Quyền lực nằm ở nơi mà con người ta tin là nó ở đó. Vậy thôi."\n\nDân chủ cũng vậy: nó tồn tại vì người dân tin vào nó, tham gia vào nó, và bảo vệ nó. Ngày nào người dân ngừng tin — dân chủ ngừng tồn tại.',
        variant: 'info',
      },
      {
        type: 'text',
        title: 'Dân chủ không phải điểm đến — Nó là con đường',
        paragraphs: [
          'Nhìn lại toàn bộ khóa học này: Dân chủ không phải là một thể chế hoàn hảo. Nghịch lý Condorcet cho thấy không có "ý chí tập thể" lý tưởng nào. Định lý Arrow cho thấy không có hệ thống bầu cử hoàn hảo. Gerrymandering cho thấy ngay cả luật dân chủ cũng có thể bị thao túng. Tyranny of the majority cho thấy đa số không phải lúc nào cũng đúng.',
          'Nhưng dân chủ — với tất cả những khiếm khuyết đó — vẫn là thứ đáng bảo vệ. Vì các phương án thay thế còn tệ hơn. Vì nó tạo ra cơ chế tự sửa lỗi: chính quyền tệ có thể bị bỏ phiếu ra đi. Vì nó phân tán quyền lực thay vì tập trung vào một người hay một nhóm.',
          'Và quan trọng nhất: dân chủ là một thể chế đòi hỏi sự tham gia chủ động của công dân. Nó không vận hành được nếu người dân thụ động, mù quáng, hay thờ ơ. Mỗi người chúng ta — bằng cách tìm hiểu, tham gia, và thách thức quyền lực — đều là một phần của nền dân chủ.',
        ],
      },
      {
        type: 'library-document',
        mode: 'inline',
        title: 'Đọc thêm: Tocqueville và nền tảng văn hóa của dân chủ',
        description: 'Tại sao một nhà tư tưởng Pháp thế kỷ 19 vẫn là người sắc sảo nhất khi phân tích điều kiện để dân chủ tồn tại và phát triển',
        category: 'Triết học chính trị',
        estimatedReadTime: '5 phút',
        documentContent: {
          sections: [
            {
              heading: 'Alexis de Tocqueville — Người quan sát nước Mỹ từ bên ngoài',
              paragraphs: [
                'Alexis de Tocqueville (1805–1859) là nhà quý tộc, luật gia, và nhà tư tưởng người Pháp. Năm 1831–1832, ông cùng người bạn Gustave de Beaumont đến Mỹ để nghiên cứu hệ thống nhà tù — nhưng đã quan sát cả xã hội Mỹ rộng lớn hơn.',
                'Tác phẩm "Democracy in America" (Về Nền Dân chủ ở Mỹ, 1835–1840) là một trong những phân tích chính trị sâu sắc nhất về dân chủ. Tocqueville không chỉ mô tả cơ chế — ông phân tích văn hóa, tập quán, và tinh thần của người Mỹ.',
              ],
            },
            {
              heading: 'Ba trụ cột của văn hóa dân chủ theo Tocqueville',
              paragraphs: [
                '1. Associations (Hội đoàn dân sự): Tocqueville ngạc nhiên vì người Mỹ có xu hướng tự nguyện lập hội — hội từ thiện, hội tôn giáo, hội chính trị, hội thể thao. Đây là môi trường để công dân học cách hợp tác, thương lượng, và tự quản.',
                '2. Tinh thần tự trị địa phương (Township democracy): Người Mỹ tham gia vào các quyết định của thị trấn, huyện, tiểu bang — không phải chỉ chờ chính phủ trung ương quyết định. Đây là trường học của dân chủ.',
                '3. Tự do báo chí và thảo luận công khai: Nhiều tờ báo, nhiều luồng ý kiến, nhiều tranh luận — ngay cả những tranh luận ồn ào và hỗn loạn. Tocqueville tin rằng đây là sức khỏe của nền dân chủ, không phải điểm yếu.',
              ],
            },
            {
              heading: 'Cảnh báo của Tocqueville — "Tyranny of the majority"',
              paragraphs: [
                'Tocqueville không phải người lạc quan mù quáng. Ông cũng cảnh báo về nguy cơ lớn nhất của dân chủ: "chuyên quyền của đa số" — khi đa số có thể dùng tư cách đa số để áp đặt ý chí lên thiểu số mà không bị kiểm soát.',
                'Ông lo ngại về "soft despotism" — sự chuyên quyền mềm: khi người dân nhường dần quyền tự quyết cho nhà nước, đổi lấy sự thoải mái và an toàn. Đây là hình thức độc tài từ từ, không thông qua bạo lực mà thông qua sự thụ động của công dân.',
              ],
            },
          ],
        },
      },
      {
        type: 'callout',
        icon: 'check',
        title: 'Tổng kết khóa học — "Của dân, do dân, vì dân"',
        text: '✓ Level 1: Dân chủ là gì, và tại sao nó "bất thường" trong lịch sử nhân loại\n✓ Level 2: Bầu cử — cơ chế chuyển hóa ý chí tập thể, với tất cả nghịch lý và giới hạn của nó\n✓ Level 3: Phân quyền — tam quyền phân lập, liên bang, checks and balances, lưỡng viện\n✓ Level 4: Văn hóa dân chủ — từ voice vote đến Australian ballot, từ 1,8% cử tri đến quyền phổ thông đầu phiếu, và điều kiện để dân chủ tồn tại\n\nBài học lớn nhất: Dân chủ không phải thứ tự nhiên mà có. Nó đòi hỏi sự tham gia chủ động, sự hiểu biết, và ý chí bảo vệ của từng công dân.',
        variant: 'success',
      },
      {
        type: 'question',
        question: 'Theo Tocqueville, điều kiện quan trọng nhất để nền dân chủ tồn tại và hoạt động hiệu quả là gì?',
        options: [
          { text: 'Có một bộ hiến pháp hoàn hảo và hệ thống pháp luật chặt chẽ', isCorrect: false },
          {
            text: 'Văn hóa tham gia chủ động của công dân — qua hội đoàn dân sự, tự trị địa phương, và thảo luận công khai',
            isCorrect: true,
          },
          {
            text: 'Sự giàu có và phát triển kinh tế cao của quốc gia',
            isCorrect: false,
          },
          {
            text: 'Sự đồng thuận tuyệt đối giữa các phe phái chính trị',
            isCorrect: false,
          },
        ],
        explanation:
          'Tocqueville quan sát rằng điều làm cho nền dân chủ Mỹ hoạt động không phải là luật pháp hay cơ chế — mà là văn hóa: sự tham gia tự nguyện vào các hội đoàn dân sự, thói quen tự quản ở cấp địa phương (township democracy), và văn hóa thảo luận công khai. Ông gọi đây là "cultural capital" — nguồn vốn văn hóa cần thiết để dân chủ tồn tại. Không có nền văn hóa này, ngay cả những cơ chế hoàn hảo nhất cũng có thể bị biến chất.',
      },
      {
        type: 'text',
        title: 'Lời kết — "Quyền lực nằm ở nơi con người tin là nó ở đó"',
        paragraphs: [
          'Chúng ta đã cùng nhau đi qua một hành trình dài — từ câu hỏi "ai đang cai trị?" đến cơ chế bầu cử, phân chia quyền lực, và văn hóa tham gia chính trị. Mỗi bài học là một mảnh ghép của bức tranh lớn hơn.',
          'Dân chủ — như tên của podcast này gợi ý — là một "hiện tượng bất thường" (oddly normal): nó được nói đến như điều hiển nhiên, nhưng thực ra rất hiếm trong lịch sử và rất khó duy trì. Nó không phải là điểm đến, không phải là thứ ai đó ban phát — nó là con đường mà mỗi thế hệ phải tiếp tục đi.',
          'Và như Varys nhắc nhở Tyrion trong Game of Thrones: "Quyền lực nằm ở nơi mà con người ta tin là nó ở đó." Dân chủ tồn tại vì chúng ta — những công dân — tin vào nó, hiểu nó, và chọn tham gia vào nó. Ngày nào điều đó còn, dân chủ còn.',
        ],
      },
    ],
  },
};

async function main() {
  const slugs = ['danchu101-13', 'danchu101-14', 'danchu101-15'];

  console.log('='.repeat(60));
  console.log('Phase 4: Adding Level 4 content — Văn hoá dân chủ');
  console.log('='.repeat(60));
  console.log(`Processing ${slugs.length} lessons...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const slug of slugs) {
    const content = level4Contents[slug];
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
  console.log(`✅ Phase 4 complete!`);
  console.log(`   Success: ${successCount} lessons`);
  if (errorCount > 0) console.log(`   Errors:  ${errorCount} lessons`);
  console.log('\n🎉 Khóa học "Của dân, do dân, vì dân" (dan-chu-101) đã hoàn thành!');
  console.log('   Level 1: 3 lessons — Thể chế chính trị là gì?');
  console.log('   Level 2: 5 lessons — Bầu cử, cuộc chiến của phiếu bầu');
  console.log('   Level 3: 4 lessons — Phân chia quyền lực');
  console.log('   Level 4: 3 lessons — Văn hoá dân chủ');
  console.log('   Tổng: 15 lessons');
}

main()
  .catch((e) => {
    console.error('Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
