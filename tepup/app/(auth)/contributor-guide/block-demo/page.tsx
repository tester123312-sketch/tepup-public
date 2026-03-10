'use client';

import Link from 'next/link';

import {
  CalculatorBlockComponent,
  SliderSimulatorBlockComponent,
  BudgetAllocatorBlockComponent,
  BiasDetectorBlockComponent,
  StatTrickBlockComponent,
  PerspectiveSwitchBlockComponent,
  HotColdGuessBlockComponent,
  RedactedDocumentBlockComponent,
  HiddenPatternBlockComponent,
  DebateArenaBlockComponent,
  ArgumentMapperBlockComponent,
  FactOrOpinionBlockComponent,
  DecisionTreeBlockComponent,
  PrisonerDilemmaBlockComponent,
  PolicyLabBlockComponent,
  SourceRankerBlockComponent,
  PropagandaDetectorBlockComponent,
  CorrelationCausationBlockComponent,
  TimelineSorterBlockComponent,
  CauseEffectChainBlockComponent,
  SpectrumPlacerBlockComponent,
  SocraticDialogBlockComponent,
  AiEssayReviewBlockComponent,
  ScenarioWhatIfBlockComponent,
} from '@/components/blocks';

import type {
  CalculatorBlock,
  SliderSimulatorBlock,
  BudgetAllocatorBlock,
  BiasDetectorBlock,
  StatTrickBlock,
  PerspectiveSwitchBlock,
  HotColdGuessBlock,
  RedactedDocumentBlock,
  HiddenPatternBlock,
  DebateArenaBlock,
  ArgumentMapperBlock,
  FactOrOpinionBlock,
  DecisionTreeBlock,
  PrisonerDilemmaBlock,
  PolicyLabBlock,
  SourceRankerBlock,
  PropagandaDetectorBlock,
  CorrelationCausationBlock,
  TimelineSorterBlock,
  CauseEffectChainBlock,
  SpectrumPlacerBlock,
  SocraticDialogBlock,
  AiEssayReviewBlock,
  ScenarioWhatIfBlock,
} from '@/lib/types/content';

// ==========================================
// MOCK DATA — Groups A-C (from dev page)
// ==========================================

const mockCalculator: CalculatorBlock = {
  type: 'calculator',
  title: 'Tính thuế thu nhập cá nhân',
  description: 'Nhập thu nhập hàng tháng để xem bạn đóng bao nhiêu thuế theo biểu thuế lũy tiến Việt Nam.',
  calculatorType: 'tax',
  inputs: [
    { id: 'income', label: 'Thu nhập hàng tháng', type: 'number', unit: 'triệu VNĐ', defaultValue: 20, min: 0, max: 200, step: 1 },
    { id: 'dependents', label: 'Số người phụ thuộc', type: 'number', unit: 'người', defaultValue: 0, min: 0, max: 10, step: 1 },
  ],
  formula: 'income - 11 - dependents * 4.4',
  outputs: [
    { id: 'taxableIncome', label: 'Thu nhập chịu thuế', formula: 'Math.max(0, income - 11 - dependents * 4.4)', unit: 'triệu VNĐ' },
    { id: 'tax', label: 'Thuế phải đóng (ước tính)', formula: 'Math.max(0, (income - 11 - dependents * 4.4) * 0.1)', unit: 'triệu VNĐ', highlight: true },
    { id: 'netIncome', label: 'Thu nhập thực nhận', formula: 'income - Math.max(0, (income - 11 - dependents * 4.4) * 0.1)', unit: 'triệu VNĐ' },
  ],
  presets: [
    { label: 'Sinh viên mới ra trường', values: { income: 10, dependents: 0 } },
    { label: 'Nhân viên văn phòng', values: { income: 25, dependents: 1 } },
    { label: 'Quản lý cấp trung', values: { income: 50, dependents: 2 } },
  ],
  insight: 'Mỗi người phụ thuộc giúp giảm 4.4 triệu VNĐ thu nhập chịu thuế. Đây là cách nhà nước hỗ trợ gia đình đông con — nhưng cũng có người cho rằng nó khuyến khích sinh đẻ nhiều.',
};

const mockSliderSimulator: SliderSimulatorBlock = {
  type: 'slider-simulator',
  title: 'Đường cong Laffer — Thuế suất vs Thu ngân sách',
  description: 'Thuế suất cao hơn có luôn mang lại nhiều tiền hơn cho nhà nước? Kéo thanh trượt để khám phá.',
  sliders: [
    { id: 'taxRate', label: 'Thuế suất', min: 0, max: 100, step: 1, defaultValue: 30, unit: '%' },
  ],
  outputs: [
    { id: 'revenue', label: 'Thu ngân sách', formula: 'taxRate * (100 - taxRate) * 0.4', unit: 'tỷ VNĐ', format: 'number' },
    { id: 'evasion', label: 'Tỷ lệ trốn thuế', formula: 'Math.min(95, Math.max(0, (taxRate - 30) * 2))', format: 'percent' },
  ],
  chart: {
    type: 'bar',
    bars: [
      { label: 'Thu ngân sách', formula: 'taxRate * (100 - taxRate) * 0.4', color: 'bg-emerald-500' },
      { label: 'Trốn thuế', formula: 'Math.min(95, Math.max(0, (taxRate - 30) * 2)) * 10', color: 'bg-red-400' },
    ],
  },
  breakpoints: [
    { condition: 'taxRate <= 10', message: 'Thuế suất quá thấp: nhà nước không đủ ngân sách cho dịch vụ công cơ bản (y tế, giáo dục, quốc phòng).', variant: 'warning' },
    { condition: 'taxRate >= 45 && taxRate <= 55', message: '💡 Đây là vùng "đỉnh Laffer" — thu ngân sách đạt tối đa. Nhiều nhà kinh tế cho rằng điểm tối ưu nằm quanh 50%.', variant: 'success' },
    { condition: 'taxRate >= 70', message: 'Thuế suất quá cao: người dân trốn thuế hoặc ngừng làm việc. Tổng thu ngân sách giảm mạnh — hiện tượng "vượt đỉnh Laffer".', variant: 'warning' },
    { condition: 'taxRate >= 90', message: '⚠️ Thuế 90%+: Gần như không ai muốn làm việc hợp pháp. Nền kinh tế ngầm phát triển. Đây là mức thuế phi thực tế.', variant: 'warning' },
  ],
};

const mockBudgetAllocator: BudgetAllocatorBlock = {
  type: 'budget-allocator',
  title: 'Phân bổ ngân sách quốc gia',
  description: 'Bạn là Thủ tướng với 100 tỷ VNĐ. Hãy phân bổ cho các lĩnh vực — và xem hệ quả!',
  totalBudget: 100,
  unit: 'tỷ VNĐ',
  categories: [
    { id: 'education', label: 'Giáo dục', icon: '📚', color: 'blue', defaultValue: 20, minValue: 5, description: 'Trường học, đại học, đào tạo nghề' },
    { id: 'health', label: 'Y tế', icon: '🏥', color: 'green', defaultValue: 20, minValue: 5, description: 'Bệnh viện, bảo hiểm y tế, phòng dịch' },
    { id: 'defense', label: 'Quốc phòng', icon: '🛡️', color: 'red', defaultValue: 15, minValue: 5, description: 'Quân đội, an ninh, biên giới' },
    { id: 'infrastructure', label: 'Hạ tầng', icon: '🏗️', color: 'amber', defaultValue: 25, minValue: 5, description: 'Đường xá, cầu cống, điện nước' },
    { id: 'welfare', label: 'Phúc lợi xã hội', icon: '🤝', color: 'purple', defaultValue: 10, minValue: 0, description: 'Trợ cấp nghèo, hưu trí, bảo hiểm thất nghiệp' },
    { id: 'science', label: 'Khoa học & Công nghệ', icon: '🔬', color: 'cyan', defaultValue: 10, minValue: 0, description: 'R&D, đổi mới sáng tạo' },
  ],
  outcomes: [
    { condition: 'education >= 30', title: 'Giáo dục xuất sắc', description: 'Tỷ lệ biết chữ đạt 99%. Lao động chất lượng cao tăng mạnh, thu hút FDI công nghệ. Tuy nhiên kết quả cần 10-15 năm mới thấy rõ.', variant: 'good' },
    { condition: 'education <= 10', title: 'Khủng hoảng giáo dục', description: 'Trường học xuống cấp, giáo viên nghỉ việc. Thế hệ tiếp theo thiếu kỹ năng, năng suất lao động giảm.', variant: 'bad' },
    { condition: 'health >= 30', title: 'Hệ thống y tế mạnh', description: 'Tuổi thọ trung bình tăng, tỷ lệ tử vong trẻ em giảm. Người dân khỏe mạnh = năng suất lao động cao hơn.', variant: 'good' },
    { condition: 'health <= 10', title: 'Y tế quá tải', description: 'Bệnh viện thiếu thuốc và nhân lực. Chi phí y tế tư nhân tăng, người nghèo không được chăm sóc sức khỏe.', variant: 'bad' },
    { condition: 'defense <= 8', title: 'An ninh yếu', description: 'Lực lượng quân đội thiếu trang bị. Khả năng phòng thủ biên giới giảm, rủi ro an ninh quốc gia tăng.', variant: 'bad' },
    { condition: 'infrastructure >= 35', title: 'Hạ tầng hiện đại', description: 'Đường cao tốc, metro, internet 5G phủ khắp. Logistics cải thiện mạnh, thương mại phát triển.', variant: 'good' },
    { condition: 'science >= 20', title: 'Đầu tư vào tương lai', description: 'Startup công nghệ bùng nổ. Bằng sáng chế tăng gấp 3. Nhưng hiệu quả cần thời gian và đội ngũ nghiên cứu chất lượng.', variant: 'good' },
    { condition: 'welfare >= 25', title: 'Phúc lợi rộng rãi', description: 'Bất bình đẳng giảm, người nghèo được hỗ trợ. Tuy nhiên chi phí ngân sách lớn và có thể tạo tâm lý ỷ lại.', variant: 'neutral' },
    { condition: 'welfare <= 3', title: 'Bỏ rơi người yếu thế', description: 'Người nghèo, người già không có lưới an toàn. Bất bình đẳng gia tăng, bất ổn xã hội.', variant: 'bad' },
  ],
  comparison: {
    label: 'Ngân sách VN 2023 (ước tính)',
    values: { education: 20, health: 15, defense: 12, infrastructure: 28, welfare: 15, science: 10 },
  },
};

const mockBiasDetector: BiasDetectorBlock = {
  type: 'bias-detector',
  title: 'Phát hiện thiên lệch truyền thông',
  instruction: 'Đọc đoạn tin dưới đây. Click vào các cụm từ được highlight và chọn loại thiên lệch phù hợp.',
  article: {
    text: 'Chính sách tăng thuế VAT lên 10% là một đòn chí mạng vào túi tiền người dân. Trong khi các chuyên gia kinh tế hàng đầu đều phản đối, chính phủ vẫn cố tình phớt lờ. Một cuộc khảo sát cho thấy 95% người dân không đồng ý — con số áp đảo chứng minh chính sách này hoàn toàn sai lầm. Rõ ràng, những kẻ soạn luật này không hiểu gì về đời sống thực tế.',
    source: 'Bài báo mẫu — Tin giả để phân tích',
  },
  segments: [
    { id: 's1', text: 'đòn chí mạng vào túi tiền', startIndex: 50, biasType: 'emotional', explanation: '"Đòn chí mạng" là ngôn ngữ gây cảm xúc mạnh, phóng đại tác động thực tế. Mức tăng VAT 2% có ảnh hưởng, nhưng không phải "chí mạng".' },
    { id: 's2', text: 'các chuyên gia kinh tế hàng đầu đều phản đối', startIndex: 100, biasType: 'cherry-pick', explanation: 'Chọn lọc thông tin: không phải tất cả chuyên gia đều phản đối. Nhiều người ủng hộ vì lý do ngân sách. Từ "đều" tạo cảm giác đồng thuận giả.' },
    { id: 's3', text: 'cố tình phớt lờ', startIndex: 157, biasType: 'loaded', explanation: '"Cố tình phớt lờ" gán ý đồ xấu mà không có bằng chứng. Có thể chính phủ đã cân nhắc nhưng có lý do khác để duy trì chính sách.' },
    { id: 's4', text: 'những kẻ soạn luật này không hiểu gì', startIndex: 303, biasType: 'ad-hominem', explanation: 'Tấn công cá nhân (ad hominem): thay vì phản bác chính sách, tác giả tấn công năng lực của người soạn luật.' },
  ],
  biasOptions: [
    { id: 'emotional', label: 'Ngôn ngữ cảm xúc' },
    { id: 'cherry-pick', label: 'Chọn lọc thông tin' },
    { id: 'loaded', label: 'Gán ý đồ (Loaded language)' },
    { id: 'ad-hominem', label: 'Tấn công cá nhân' },
    { id: 'false-eq', label: 'Đánh đồng sai' },
    { id: 'strawman', label: 'Bù nhìn rơm' },
  ],
};

const mockStatTrick: StatTrickBlock = {
  type: 'stat-trick',
  title: 'Biểu đồ này có vấn đề gì?',
  instruction: 'Nhìn biểu đồ so sánh GDP hai quốc gia. Liệu sự khác biệt có lớn như biểu đồ thể hiện?',
  chart: {
    type: 'bar',
    title: 'GDP bình quân đầu người (USD)',
    data: [
      { label: 'Nước A', value: 4200, displayValue: '4,200' },
      { label: 'Nước B', value: 4800, displayValue: '4,800' },
    ],
    yAxisStart: 4000,
  },
  question: 'Biểu đồ này gây hiểu nhầm bằng cách nào?',
  options: [
    { id: 'a', text: 'Trục Y không bắt đầu từ 0 — phóng đại sự khác biệt', isCorrect: true },
    { id: 'b', text: 'Số liệu bị làm giả hoàn toàn', isCorrect: false },
    { id: 'c', text: 'Thiếu đơn vị đo lường', isCorrect: false },
    { id: 'd', text: 'Màu sắc gây hiểu nhầm', isCorrect: false },
  ],
  reveal: {
    explanation: 'Trục Y bắt đầu từ 4,000 thay vì 0. Điều này khiến chênh lệch 600 USD (~14%) trông như gấp đôi. Khi trục Y bắt đầu từ 0, sự khác biệt thực sự rất nhỏ. Đây là một trong những mẹo phổ biến nhất trong truyền thông số liệu.',
    correctedChart: {
      type: 'bar',
      title: 'GDP bình quân đầu người (USD) — Trục Y từ 0',
      data: [
        { label: 'Nước A', value: 4200, displayValue: '4,200' },
        { label: 'Nước B', value: 4800, displayValue: '4,800' },
      ],
      yAxisStart: 0,
    },
  },
};

const mockPerspectiveSwitch: PerspectiveSwitchBlock = {
  type: 'perspective-switch',
  title: 'Nhà máy dệt đóng cửa',
  event: 'Công ty dệt may ABC với 500 công nhân vừa thông báo đóng cửa nhà máy tại Bình Dương để chuyển sang tự động hóa. Đây là sự kiện gây tranh cãi trong cộng đồng.',
  perspectives: [
    {
      id: 'worker',
      role: 'Công nhân',
      icon: '👷',
      narrative: 'Tôi đã làm ở đây 12 năm. Tháng tới tôi mất việc, hai con còn đang đi học. Công ty nói sẽ "hỗ trợ chuyển đổi nghề" nhưng ai thuê một người 45 tuổi chỉ biết may vá? Tiền trợ cấp thất nghiệp chỉ đủ 3 tháng. Tôi không phản đối công nghệ, nhưng tại sao không có chương trình đào tạo lại TRƯỚC KHI đóng cửa?',
    },
    {
      id: 'owner',
      role: 'Giám đốc công ty',
      icon: '👔',
      narrative: 'Đây là quyết định khó khăn nhất trong sự nghiệp tôi. Nhưng nếu không tự động hóa, chúng tôi phá sản trong 2 năm — lúc đó 500 người cũng mất việc. Nhà máy tự động cần 50 kỹ sư thay vì 500 công nhân, nhưng năng suất gấp 10 lần. Chúng tôi đã lập quỹ 5 tỷ hỗ trợ chuyển đổi nghề, nhưng thú thực, tôi biết nó không đủ.',
    },
    {
      id: 'gov',
      role: 'Chính quyền địa phương',
      icon: '🏛️',
      narrative: 'Chúng tôi đang trong thế kẹt. Nếu ngăn cản, công ty sẽ dời sang nước khác — mất luôn thuế và việc làm. Nếu để yên, 500 gia đình mất thu nhập. Chúng tôi đang đàm phán để công ty cam kết ưu tiên tuyển lại công nhân cũ cho các vị trí mới, và dùng ngân sách tỉnh hỗ trợ đào tạo lại. Nhưng ngân sách có hạn.',
    },
  ],
  question: {
    text: 'Sau khi đọc cả 3 góc nhìn, điều gì khiến vấn đề này khó giải quyết nhất?',
    options: [
      { id: 'a', text: 'Cả 3 bên đều có lý, không ai hoàn toàn sai', isCorrect: true },
      { id: 'b', text: 'Giám đốc chỉ nghĩ đến lợi nhuận', isCorrect: false },
      { id: 'c', text: 'Công nhân không chịu học nghề mới', isCorrect: false },
      { id: 'd', text: 'Chính quyền không quan tâm đến dân', isCorrect: false },
    ],
    explanation: 'Đây là ví dụ điển hình của "vấn đề không có đáp án đúng" trong KHXH. Mỗi bên hành động hợp lý theo hoàn cảnh của mình. Giám đốc cần cạnh tranh để tồn tại, công nhân cần thu nhập để sống, chính quyền cần cân bằng phát triển và ổn định xã hội. Giải pháp tốt cần sự thỏa hiệp từ cả 3 bên.',
  },
};

const mockHotColdGuess: HotColdGuessBlock = {
  type: 'hot-cold-guess',
  title: 'Bạn biết gì về kinh tế Việt Nam?',
  question: 'GDP bình quân đầu người của Việt Nam năm 2023 là bao nhiêu USD?',
  answer: 4284,
  unit: 'USD',
  tolerance: 10,
  hints: [
    'Việt Nam thuộc nhóm thu nhập trung bình thấp.',
    'Cao hơn Lào và Campuchia, nhưng thấp hơn Thái Lan.',
    'Nằm trong khoảng 3,000 - 6,000 USD.',
  ],
  context: 'GDP bình quân đầu người VN năm 2023 đạt khoảng 4,284 USD. Con số này tăng gần 10 lần so với năm 2000 (390 USD). Tuy nhiên, GDP bình quân không phản ánh bất bình đẳng — người giàu nhất VN có tài sản gấp hàng nghìn lần người nghèo nhất.',
};

const mockRedactedDocument: RedactedDocumentBlock = {
  type: 'redacted-document',
  title: 'Tài liệu lịch sử',
  instruction: 'Click vào phần bị bôi đen để đoán nội dung. Mỗi từ đúng sẽ mở ra gợi ý cho từ tiếp theo.',
  documentTitle: 'Biên bản Hội nghị Kinh tế — 1986',
  content: 'Trước tình hình kinh tế suy thoái nghiêm trọng, Đại hội VI đã quyết định thực hiện chính sách [REDACTED:r1]. Mô hình kinh tế cũ dựa trên [REDACTED:r2] đã cho thấy nhiều bất cập. Chính sách mới cho phép [REDACTED:r3] tham gia vào hoạt động kinh tế, đánh dấu bước ngoặt trong lịch sử phát triển đất nước. Kết quả sau 10 năm: GDP tăng [REDACTED:r4] lần.',
  redactions: [
    { id: 'r1', answer: 'Đổi Mới', hint: 'Hai từ, bắt đầu bằng chữ Đ, chính sách cải cách kinh tế VN', alternatives: ['đổi mới', 'Doi Moi'] },
    { id: 'r2', answer: 'bao cấp', hint: 'Nhà nước phân phối mọi thứ, không có thị trường tự do', alternatives: ['Bao cấp', 'kinh tế bao cấp'] },
    { id: 'r3', answer: 'tư nhân', hint: 'Đối lập với nhà nước/công, người dân và doanh nghiệp...', alternatives: ['Tư nhân', 'khu vực tư nhân', 'kinh tế tư nhân'] },
    { id: 'r4', answer: '3', hint: 'Một con số từ 2-5', alternatives: ['ba', '3 lần'] },
  ],
  context: 'Chính sách Đổi Mới (1986) là bước ngoặt lớn nhất trong lịch sử kinh tế Việt Nam hiện đại. Từ mô hình kinh tế kế hoạch tập trung (bao cấp), VN chuyển sang kinh tế thị trường định hướng XHCN. Khu vực tư nhân được công nhận và phát triển mạnh mẽ. GDP tăng gấp 3 trong giai đoạn 1986-1996, đưa hàng triệu người thoát nghèo.',
};

const mockHiddenPattern: HiddenPatternBlock = {
  type: 'hidden-pattern',
  title: 'Tìm mối tương quan ẩn',
  instruction: 'Quan sát bảng dữ liệu dưới đây. Click tiêu đề cột để sắp xếp và tìm ra pattern.',
  table: {
    headers: ['Quốc gia', 'GDP/người (USD)', 'Chi giáo dục (% GDP)', 'Tỷ lệ biết chữ (%)', 'Tuổi thọ TB'],
    rows: [
      ['Việt Nam', 4284, 4.2, 95.8, 75],
      ['Campuchia', 1785, 2.1, 80.5, 70],
      ['Singapore', 65234, 2.9, 97.5, 84],
      ['Nhật Bản', 33815, 3.6, 99.0, 85],
      ['Lào', 1950, 2.3, 84.7, 68],
      ['Hàn Quốc', 32255, 4.6, 98.8, 84],
      ['Myanmar', 1095, 1.9, 75.6, 67],
      ['Thái Lan', 7067, 3.8, 93.8, 78],
      ['Philippines', 3461, 3.4, 96.3, 72],
      ['Indonesia', 4788, 3.5, 95.7, 72],
    ],
  },
  question: 'Bạn nhận thấy pattern chính nào trong dữ liệu?',
  options: [
    { id: 'a', text: 'GDP cao → chi giáo dục cao → tỷ lệ biết chữ cao', isCorrect: false },
    { id: 'b', text: 'GDP cao tương quan mạnh với tuổi thọ trung bình cao', isCorrect: true },
    { id: 'c', text: 'Tỷ lệ biết chữ không liên quan gì đến GDP', isCorrect: false },
    { id: 'd', text: 'Quốc gia Đông Nam Á đều có GDP thấp', isCorrect: false },
  ],
  explanation: 'Tương quan mạnh nhất là GDP/người ↔ Tuổi thọ. Singapore (GDP cao nhất) có tuổi thọ 84, Myanmar (GDP thấp nhất) chỉ 67. Điều này vì nước giàu hơn có y tế, dinh dưỡng, môi trường sống tốt hơn. Lưu ý: tương quan ≠ nhân quả — còn nhiều yếu tố khác ảnh hưởng!',
  highlightColumns: [1, 4],
};

// ==========================================
// MOCK DATA — Group D: Lập luận & Tranh luận
// ==========================================

const mockDebateArena: DebateArenaBlock = {
  type: 'debate-arena',
  title: 'Tranh luận: Thuế người giàu',
  topic: 'Nên tăng thuế thu nhập người giàu lên 50%?',
  stances: [
    { id: 'for', label: 'Nên tăng', description: 'Tăng thuế người giàu để tái phân phối công bằng hơn, đầu tư vào phúc lợi xã hội và giảm bất bình đẳng.' },
    { id: 'against', label: 'Không nên tăng', description: 'Thuế cao làm giảm động lực đầu tư, gây chảy vốn ra nước ngoài và có thể giảm tổng thu ngân sách.' },
  ],
  rounds: [
    {
      opponentArgument: 'Thuế người giàu 50% sẽ khiến họ chuyển tài sản ra nước ngoài. Nhìn Pháp — khi tăng thuế, hàng nghìn triệu phú đã rời đi. Việt Nam sẽ mất nguồn vốn đầu tư quan trọng.',
      responseOptions: [
        { id: 'r1a', text: 'Đúng, nhưng có thể áp dụng thuế thoát (exit tax) như Mỹ đã làm, ngăn chặn việc chuyển tài sản ra nước ngoài.', score: 3, feedback: 'Luận điểm mạnh! Bạn đã đưa ra giải pháp cụ thể và dẫn chứng từ thực tế.' },
        { id: 'r1b', text: 'Người giàu nên có trách nhiệm với xã hội, không nên chỉ nghĩ đến lợi ích cá nhân.', score: 1, feedback: 'Đây là kêu gọi đạo đức, không phải luận điểm kinh tế. Đối phương đang nói về hậu quả thực tế, bạn cần trả lời bằng dữ liệu.' },
        { id: 'r1c', text: 'Số triệu phú rời Pháp chỉ chiếm 0.2% dân số. Tổng thu thuế vẫn tăng sau cải cách. Cần nhìn toàn cảnh thay vì chỉ nhìn một nhóm nhỏ.', score: 2, feedback: 'Tốt! Bạn đã phản bác bằng số liệu, nhưng cần giải thích rõ hơn tại sao tổng thu vẫn tăng.' },
      ],
    },
    {
      opponentArgument: 'Thuế cao sẽ giảm động lực làm giàu, giảm khởi nghiệp và đổi mới sáng tạo. Tại sao người ta phải làm việc chăm chỉ nếu nhà nước lấy mất nửa thu nhập?',
      responseOptions: [
        { id: 'r2a', text: 'Nghiên cứu từ OECD cho thấy không có mối tương quan rõ ràng giữa thuế suất và tỷ lệ khởi nghiệp. Động lực làm giàu không chỉ là tiền.', score: 3, feedback: 'Xuất sắc! Dẫn chứng từ tổ chức uy tín và phản bác giả định ngầm của đối phương rằng "động lực chỉ là tiền".' },
        { id: 'r2b', text: 'Những người giàu vẫn giàu, chỉ là bớt giàu đi một chút thôi.', score: 1, feedback: 'Luận điểm yếu. Bạn chưa giải quyết vấn đề về động lực kinh tế mà đối phương nêu ra.' },
        { id: 'r2c', text: 'Thuế 50% chỉ áp dụng cho phần thu nhập trên ngưỡng cao, không phải toàn bộ thu nhập. Một người kiếm 1 tỷ/tháng vẫn giữ lại phần lớn.', score: 2, feedback: 'Điểm tốt về thuế lũy tiến! Nhiều người hiểu nhầm rằng 50% là trên toàn bộ thu nhập.' },
      ],
    },
  ],
  conclusion: 'Tranh luận về thuế là vấn đề kinh tế - chính trị phức tạp. Cả hai phía đều có luận điểm hợp lý. Điểm mấu chốt là: chính sách thuế tốt cần cân bằng giữa công bằng xã hội và hiệu quả kinh tế, đồng thời xét đến bối cảnh cụ thể của từng quốc gia.',
};

const mockArgumentMapper: ArgumentMapperBlock = {
  type: 'argument-mapper',
  title: 'Phân tích lập luận: Tăng trưởng vs Môi trường',
  instruction: 'Đọc đoạn văn và xác định từng thành phần luận điểm: tiền đề, kết luận, hay ngụy biện?',
  passage: 'Việt Nam cần ưu tiên tăng trưởng GDP để thoát nghèo. Trong 30 năm qua, GDP đã tăng gấp 10 lần. Vì vậy, mọi thiệt hại môi trường đều là cái giá chấp nhận được. Các nước phát triển như Mỹ và Nhật cũng đã phá hủy môi trường trước khi giàu, nên Việt Nam cũng nên làm vậy.',
  elements: [
    { id: 'e1', text: 'Việt Nam cần ưu tiên tăng trưởng GDP để thoát nghèo', startIndex: 0, endIndex: 51, correctType: 'premise', explanation: 'Đây là tiền đề 1 — một nhận định làm cơ sở cho luận điểm. Tiền đề này có thể hợp lý nhưng cần kiểm chứng.' },
    { id: 'e2', text: 'Trong 30 năm qua, GDP đã tăng gấp 10 lần', startIndex: 53, endIndex: 93, correctType: 'evidence', explanation: 'Đây là bằng chứng (evidence) — số liệu cụ thể để ủng hộ tiền đề. Tuy nhiên, GDP tăng không nhất thiết có nghĩa là mọi người đều hưởng lợi.' },
    { id: 'e3', text: 'mọi thiệt hại môi trường đều là cái giá chấp nhận được', startIndex: 103, endIndex: 157, correctType: 'conclusion', explanation: 'Đây là kết luận chính của luận điểm. Tuy nhiên, kết luận này nhảy từ "cần tăng trưởng" sang "mọi thiệt hại đều chấp nhận được" — một bước nhảy logic quá lớn.' },
    { id: 'e4', text: 'Các nước phát triển như Mỹ và Nhật cũng đã phá hủy môi trường trước khi giàu, nên Việt Nam cũng nên làm vậy', startIndex: 159, endIndex: 270, correctType: 'fallacy', explanation: 'Đây là ngụy biện "appeal to tradition/precedent" — việc nước khác đã làm không có nghĩa là đúng. Hôm nay có công nghệ sạch hơn, không cần lặp lại sai lầm cũ.' },
  ],
  elementTypes: [
    { id: 'premise', label: 'Tiền đề', color: 'blue' },
    { id: 'conclusion', label: 'Kết luận', color: 'green' },
    { id: 'fallacy', label: 'Ngụy biện', color: 'red' },
    { id: 'evidence', label: 'Bằng chứng', color: 'amber' },
  ],
  fallacyName: 'Appeal to precedent (Viện dẫn tiền lệ)',
};

const mockFactOrOpinion: FactOrOpinionBlock = {
  type: 'fact-or-opinion',
  title: 'Sự thật hay Ý kiến?',
  instruction: 'Phân loại từng phát biểu: là sự thật khách quan, ý kiến chủ quan, hay thông tin gây hiểu nhầm?',
  statements: [
    { id: 'f1', text: 'GDP Việt Nam năm 2023 đạt khoảng 430 tỷ USD.', correctAnswer: 'fact', explanation: 'Đây là sự thật có thể kiểm chứng từ số liệu của Ngân hàng Thế giới và Tổng cục Thống kê.', source: 'World Bank Data 2023' },
    { id: 'f2', text: 'Việt Nam là quốc gia hạnh phúc nhất Đông Nam Á.', correctAnswer: 'opinion', explanation: '"Hạnh phúc nhất" là đánh giá chủ quan. Các bảng xếp hạng hạnh phúc khác nhau cho kết quả khác nhau tùy theo tiêu chí.' },
    { id: 'f3', text: '95% người Việt ủng hộ chính sách kinh tế hiện tại.', correctAnswer: 'misleading', explanation: 'Con số 95% thường đến từ các cuộc khảo sát không đại diện hoặc có thiết kế câu hỏi dẫn dắt. Cần xem nguồn gốc và phương pháp khảo sát.' },
    { id: 'f4', text: 'Tỷ lệ lạm phát Việt Nam năm 2023 là 3.25%.', correctAnswer: 'fact', explanation: 'Số liệu thống kê chính thức từ Tổng cục Thống kê, có thể kiểm chứng độc lập.', source: 'Tổng cục Thống kê Việt Nam' },
    { id: 'f5', text: 'Kinh tế tư nhân là động lực quan trọng nhất của nền kinh tế.', correctAnswer: 'opinion', explanation: '"Quan trọng nhất" là đánh giá chủ quan. Kinh tế tư nhân đóng góp ~40% GDP, nhưng khu vực FDI và nhà nước cũng rất quan trọng.' },
    { id: 'f6', text: 'Nếu không có đầu tư nước ngoài, Việt Nam sẽ quay lại nghèo đói.', correctAnswer: 'misleading', explanation: 'Đây là phát biểu phóng đại và đơn giản hóa. FDI quan trọng nhưng không phải yếu tố duy nhất. Kinh tế nội địa và nông nghiệp vẫn là nền tảng lớn.' },
  ],
  passingScore: 4,
};

// ==========================================
// MOCK DATA — Group E: Mô phỏng & Ra quyết định
// ==========================================

const mockDecisionTree: DecisionTreeBlock = {
  type: 'decision-tree',
  title: 'Xử lý ô nhiễm nhà máy',
  scenario: 'Bạn là Trưởng thôn. Một nhà máy mới xây gần làng xả thải nước bẩn ra sông, ảnh hưởng đến nước sinh hoạt và nông nghiệp của 200 hộ dân.',
  role: 'Trưởng thôn',
  nodes: [
    {
      id: 'start',
      text: 'Người dân khiếu nại về nước sông bị ô nhiễm từ nhà máy. Bạn cần hành động. Chọn cách xử lý:',
      choices: [
        { id: 'c1', text: 'Báo cáo lên UBND huyện và yêu cầu thanh tra môi trường', nextNodeId: 'report', consequence: 'Bạn đi theo con đường chính thức, có thể mất thời gian nhưng đúng pháp luật.' },
        { id: 'c2', text: 'Trực tiếp gặp giám đốc nhà máy để đàm phán', nextNodeId: 'negotiate', consequence: 'Bạn chọn đối thoại trực tiếp, nhanh hơn nhưng ít áp lực pháp lý.' },
      ],
    },
    {
      id: 'report',
      text: 'UBND huyện cử đoàn thanh tra xuống. Kết quả: nhà máy vi phạm, bị phạt 200 triệu và yêu cầu xử lý nước thải trong 3 tháng. Nhưng nhà máy xin gia hạn vì "chưa có ngân sách". Bạn chọn:',
      choices: [
        { id: 'c3', text: 'Chấp nhận gia hạn nhưng yêu cầu nhà máy hỗ trợ nước sạch cho dân trong thời gian chờ', nextNodeId: 'compromise', consequence: 'Bạn cân bằng giữa thực tế và quyền lợi người dân.' },
        { id: 'c4', text: 'Không chấp nhận, yêu cầu nhà máy dừng hoạt động cho đến khi xử lý xong', nextNodeId: 'strict', consequence: 'Bạn cứng rắn, bảo vệ môi trường nhưng nhà máy có thể đóng cửa vĩnh viễn.' },
      ],
    },
    {
      id: 'negotiate',
      text: 'Giám đốc nhà máy hứa sẽ lắp hệ thống xử lý nước thải, nhưng xin "3 tháng để chuẩn bị". Đồng thời đề nghị "hỗ trợ thôn 100 triệu đồng" cho quỹ phúc lợi. Bạn chọn:',
      choices: [
        { id: 'c5', text: 'Chấp nhận đề nghị và giám sát chặt việc thực hiện', nextNodeId: 'trust', consequence: 'Bạn tin tưởng thiện chí nhưng có rủi ro nhà máy không giữ lời.' },
        { id: 'c6', text: 'Từ chối tiền và vẫn báo cáo lên cấp trên để có cơ sở pháp lý', nextNodeId: 'report_late', consequence: 'Bạn giữ nguyên tắc nhưng mất thời gian và có thể bị xem là không linh hoạt.' },
      ],
    },
    {
      id: 'compromise',
      text: 'Nhà máy cung cấp nước sạch cho dân và hoàn thành hệ thống xử lý sau 4 tháng. Môi trường dần hồi phục. Người dân hài lòng, nhà máy vẫn hoạt động và tạo việc làm cho 50 người trong thôn.',
      choices: [],
      isEnding: true,
      endingType: 'good',
      endingSummary: 'Kết quả tốt: bạn cân bằng được quyền lợi người dân, bảo vệ môi trường, và duy trì việc làm địa phương. Giải pháp thỏa hiệp thường khó nhưng hiệu quả nhất.',
    },
    {
      id: 'strict',
      text: 'Nhà máy bị buộc dừng hoạt động. Do không có doanh thu, họ quyết định đóng cửa vĩnh viễn. 50 công nhân mất việc. Môi trường sạch hơn nhưng kinh tế thôn suy giảm.',
      choices: [],
      isEnding: true,
      endingType: 'neutral',
      endingSummary: 'Kết quả hai mặt: môi trường được bảo vệ nhưng cái giá kinh tế lớn. Trong thực tế, cần tìm giải pháp cân bằng hơn.',
    },
    {
      id: 'trust',
      text: 'Nhà máy lắp hệ thống xử lý nhưng chỉ đạt 70% tiêu chuẩn. Nước sông bớt ô nhiễm nhưng chưa hoàn toàn sạch. Dân vẫn khiếu nại. Bạn phải báo cáo lên cấp trên muộn — bị phê bình vì xử lý chậm.',
      choices: [],
      isEnding: true,
      endingType: 'neutral',
      endingSummary: 'Kết quả trung bình: tin tưởng mà không có cơ chế giám sát mạnh sẽ dẫn đến kết quả không trọn vẹn. Bài học: luôn cần cơ sở pháp lý, dù là đàm phán thiện chí.',
    },
    {
      id: 'report_late',
      text: 'Sau khi báo cáo muộn, UBND vẫn xử phạt nhà máy. Nhưng giám đốc nhà máy tố bạn đã "nhận tiền rồi lại báo cáo", dù bạn từ chối. Uy tín bị ảnh hưởng. Bài học đắt giá về quy trình.',
      choices: [],
      isEnding: true,
      endingType: 'bad',
      endingSummary: 'Kết quả xấu: việc đàm phán trước rồi báo cáo sau tạo kẽ hở để bị vu khống. Bài học: nên báo cáo chính thức trước, rồi mới đàm phán với sự hỗ trợ của cơ quan chức năng.',
    },
  ],
  startNodeId: 'start',
};

const mockPrisonerDilemma: PrisonerDilemmaBlock = {
  type: 'prisoner-dilemma',
  title: 'Thế lưỡng nan thương mại',
  scenario: 'Hai quốc gia láng giềng — Nước A và Nước B — đang quyết định về chính sách thuế quan. Mỗi năm, mỗi nước chọn: Hợp tác (giảm thuế, tự do thương mại) hoặc Phản bội (tăng thuế, bảo hộ nội địa). Bạn là lãnh đạo Nước A.',
  players: [
    { id: 'a', name: 'Nước A (Bạn)', icon: '🇻🇳' },
    { id: 'b', name: 'Nước B', icon: '🌏' },
  ],
  rounds: 3,
  payoffMatrix: {
    bothCooperate: [3, 3],
    bothDefect: [1, 1],
    oneCooperates: [0, 5],
  },
  opponentStrategy: 'tit-for-tat',
  explanation: 'Đây là mô hình "Thế lưỡng nan tù nhân" (Prisoner\'s Dilemma) trong lý thuyết trò chơi. Chiến lược "ăn miếng trả miếng" (tit-for-tat) là một trong những chiến lược hiệu quả nhất: bắt đầu bằng hợp tác, sau đó làm theo đối phương. Bài học: trong quan hệ lâu dài, hợp tác thường có lợi hơn phản bội, vì cả hai bên đều được lợi từ thương mại tự do.',
};

const mockPolicyLab: PolicyLabBlock = {
  type: 'policy-lab',
  title: 'Phòng thí nghiệm chính sách',
  description: 'Điều chỉnh 3 chính sách kinh tế và quan sát tác động lên các chỉ số và nhóm dân cư.',
  context: 'Việt Nam đang đối mặt với áp lực lạm phát tăng cao sau đại dịch. Ngân hàng Nhà nước và Chính phủ cần phối hợp chính sách tiền tệ và tài khóa để ổn định kinh tế mà không làm chậm tăng trưởng.',
  policies: [
    { id: 'interestRate', label: 'Lãi suất cơ bản', icon: '🏦', min: 0, max: 20, step: 0.5, defaultValue: 7, unit: '%' },
    { id: 'govSpending', label: 'Chi tiêu chính phủ', icon: '💰', min: 0, max: 100, step: 5, defaultValue: 60, unit: 'tỷ VNĐ' },
    { id: 'minWage', label: 'Lương tối thiểu', icon: '👷', min: 0, max: 10, step: 0.1, defaultValue: 4.68, unit: 'triệu VNĐ' },
  ],
  indicators: [
    { id: 'inflation', label: 'Tỷ lệ lạm phát', icon: '📈', formula: 'Math.max(0, 3 + (govSpending - 60) * 0.08 - (interestRate - 7) * 0.5 + (minWage - 4.68) * 0.3)', format: 'percent', goodRange: [2, 4] },
    { id: 'gdpGrowth', label: 'Tăng trưởng GDP', icon: '📊', formula: 'Math.max(-2, 6 + (govSpending - 60) * 0.05 - (interestRate - 7) * 0.3 + (minWage - 4.68) * 0.1)', format: 'percent', goodRange: [5, 8] },
    { id: 'unemployment', label: 'Tỷ lệ thất nghiệp', icon: '👥', formula: 'Math.max(0, 3 - (govSpending - 60) * 0.03 + (interestRate - 7) * 0.4 + (minWage - 4.68) * 0.2)', format: 'percent', goodRange: [2, 4] },
  ],
  populations: [
    { id: 'workers', label: 'Người lao động', impactFormula: 'Math.round(50 + (minWage - 4.68) * 10 - (unemployment) * 5)', description: 'Hưởng lợi từ lương tối thiểu cao hơn, nhưng bị ảnh hưởng bởi thất nghiệp.' },
    { id: 'business', label: 'Chủ doanh nghiệp', impactFormula: 'Math.round(50 + (gdpGrowth - 6) * 8 - (interestRate - 7) * 3 - (minWage - 4.68) * 5)', description: 'Cần lãi suất thấp và tăng trưởng cao, bị áp lực bởi lương tối thiểu tăng.' },
    { id: 'retirees', label: 'Người hưu trí', impactFormula: 'Math.round(50 - (inflation - 3) * 10 + (interestRate - 7) * 2)', description: 'Sống bằng lương hưu cố định, bị thiệt hại nhiều nhất bởi lạm phát.' },
  ],
  insight: 'Không có chính sách nào làm hài lòng tất cả mọi người. Tăng lương tối thiểu giúp người lao động nhưng tăng chi phí doanh nghiệp. Tăng lãi suất kiềm chế lạm phát nhưng làm chậm tăng trưởng. Đây là "tam giác bất khả thi" của chính sách kinh tế.',
};

// ==========================================
// MOCK DATA — Group F: Media Literacy
// ==========================================

const mockSourceRanker: SourceRankerBlock = {
  type: 'source-ranker',
  title: 'Xếp hạng độ tin cậy nguồn tin',
  event: 'Phát hiện vaccine COVID mới có tác dụng phụ nghiêm trọng',
  instruction: 'Sắp xếp 4 nguồn tin từ đáng tin cậy nhất đến ít tin cậy nhất.',
  sources: [
    {
      id: 's1',
      name: 'Tạp chí Y khoa New England (NEJM)',
      excerpt: 'Nghiên cứu trên 50,000 người tình nguyện trong 12 tháng cho thấy 0.3% báo cáo tác dụng phụ nghiêm trọng, tương đương với các vaccine trước đó. Kết quả đã được phản biện độc lập (peer-reviewed).',
      credibilityScore: 95,
      explanation: 'Tạp chí y khoa uy tín nhất thế giới, có quy trình phản biện nghiêm ngặt. Số liệu cụ thể, có nhóm đối chứng.',
      greenFlags: ['Peer-reviewed', 'Mẫu lớn (50,000)', 'Nghiên cứu 12 tháng', 'So sánh với vaccine khác'],
    },
    {
      id: 's2',
      name: 'Bài đăng Facebook của "Bác sĩ Minh"',
      excerpt: 'KHẨN CẤP!!! Vaccine mới gây ra hàng trăm ca tử vong mà chính phủ giấu!!!!! Chia sẻ trước khi bị xóa!!! Một người bạn tôi tiêm xong bị liệt nửa người!!!',
      credibilityScore: 10,
      explanation: 'Dấu hiệu tin giả điển hình: viết hoa, nhiều dấu chấm than, kêu gọi "chia sẻ trước khi bị xóa", dùng giai thoại cá nhân thay vì dữ liệu.',
      redFlags: ['Ngôn ngữ cảm xúc cực đoan', 'Không có số liệu', 'Kêu gọi chia sẻ gấp', 'Giai thoại cá nhân', 'Không xác minh danh tính "bác sĩ"'],
    },
    {
      id: 's3',
      name: 'Thông cáo Bộ Y tế',
      excerpt: 'Bộ Y tế khẳng định vaccine đã được kiểm định đầy đủ trước khi cấp phép. Một số trường hợp tác dụng phụ đã được ghi nhận và đang được theo dõi. Bộ khuyến cáo người dân tiếp tục tiêm chủng theo lịch.',
      credibilityScore: 70,
      explanation: 'Nguồn chính thức nhưng có thể có thiên lệch bảo vệ chính sách. Thông tin chung chung, thiếu số liệu cụ thể.',
      greenFlags: ['Nguồn chính thức', 'Thừa nhận tác dụng phụ'],
      redFlags: ['Có thể thiên lệch bảo vệ chính sách', 'Thiếu số liệu cụ thể'],
    },
    {
      id: 's4',
      name: 'Blog "Sức khỏe Tự nhiên 360"',
      excerpt: 'Khoa học đã chứng minh vaccine chứa nhiều hóa chất độc hại. Thay vào đó, hãy tăng cường miễn dịch tự nhiên bằng nghệ, gừng và vitamin C. Nhiều bác sĩ ở nước ngoài đã lên tiếng phản đối vaccine.',
      credibilityScore: 20,
      explanation: 'Blog không có uy tín y khoa. Sử dụng cụm "khoa học đã chứng minh" mà không dẫn nguồn. Quảng cáo sản phẩm thay thế. "Nhiều bác sĩ" không được nêu tên.',
      redFlags: ['Không dẫn nguồn', 'Quảng cáo sản phẩm', 'Viện dẫn "nhiều bác sĩ" mà không nêu tên', 'Đưa thông tin sai về "hóa chất độc hại"'],
    },
  ],
};

const mockPropagandaDetector: PropagandaDetectorBlock = {
  type: 'propaganda-detector',
  title: 'Phát hiện kỹ thuật tuyên truyền',
  instruction: 'Đọc bài báo về dự án "Thành phố Xanh" và xác định các kỹ thuật tuyên truyền được sử dụng.',
  article: {
    text: 'Dự án "Thành phố Xanh" là bước tiến vĩ đại nhất trong lịch sử phát triển đô thị. Tất cả người dân đều nhiệt liệt ủng hộ dự án này. Các chuyên gia hàng đầu thế giới khẳng định đây là mô hình duy nhất có thể cứu môi trường. Những kẻ phản đối chỉ là những người không hiểu biết hoặc có ý đồ xấu. Chỉ có hai lựa chọn: ủng hộ dự án hoặc chấp nhận một tương lai diệt vong.',
    source: 'Bài báo mẫu — Phân tích tuyên truyền',
    context: 'Dự án "Thành phố Xanh" là một dự án đô thị hóa giả tưởng. Bài báo này sử dụng nhiều kỹ thuật tuyên truyền để tạo sự ủng hộ vô điều kiện.',
  },
  segments: [
    { id: 'p1', text: 'bước tiến vĩ đại nhất trong lịch sử phát triển đô thị', startIndex: 25, techniqueType: 'loaded-language', explanation: '"Vĩ đại nhất trong lịch sử" là ngôn ngữ phóng đại nhằm tạo cảm xúc tích cực quá mức. Không có cơ sở để khẳng định đây là "vĩ đại nhất".' },
    { id: 'p2', text: 'Tất cả người dân đều nhiệt liệt ủng hộ', startIndex: 82, techniqueType: 'bandwagon', explanation: 'Kỹ thuật "ai cũng làm vậy" (bandwagon) — khẳng định "tất cả" ủng hộ để tạo áp lực đồng thuận. Trong thực tế, không có chính sách nào được 100% ủng hộ.' },
    { id: 'p3', text: 'Các chuyên gia hàng đầu thế giới khẳng định đây là mô hình duy nhất', startIndex: 130, techniqueType: 'appeal-to-authority', explanation: 'Viện dẫn "chuyên gia hàng đầu" mà không nêu tên cụ thể. Từ "duy nhất" là tuyệt đối hóa — không có mô hình nào là "duy nhất".' },
    { id: 'p4', text: 'Chỉ có hai lựa chọn: ủng hộ dự án hoặc chấp nhận một tương lai diệt vong', startIndex: 277, techniqueType: 'false-dilemma', explanation: 'Ngụy biện "lưỡng đao" (false dilemma) — chỉ đưa ra 2 lựa chọn cực đoan. Trong thực tế có nhiều lựa chọn: ủng hộ có điều kiện, yêu cầu sửa đổi, đề xuất phương án thay thế...' },
  ],
  techniqueOptions: [
    { id: 'bandwagon', label: 'Bandwagon', description: '"Ai cũng làm vậy" — tạo áp lực đồng thuận' },
    { id: 'appeal-to-authority', label: 'Appeal to Authority', description: 'Viện dẫn chuyên gia/người nổi tiếng mà không có bằng chứng' },
    { id: 'loaded-language', label: 'Loaded Language', description: 'Ngôn ngữ cảm xúc mạnh, phóng đại' },
    { id: 'false-dilemma', label: 'False Dilemma', description: 'Chỉ đưa ra 2 lựa chọn cực đoan, bỏ qua phương án khác' },
    { id: 'card-stacking', label: 'Card Stacking', description: 'Chỉ đưa thông tin có lợi, giấu thông tin bất lợi' },
  ],
};

const mockCorrelationCausation: CorrelationCausationBlock = {
  type: 'correlation-causation',
  title: 'Tương quan hay Nhân quả?',
  instruction: 'Quan sát dữ liệu và quyết định: hai yếu tố có quan hệ nhân quả thực sự, hay chỉ là tương quan ngẫu nhiên?',
  pairs: [
    {
      id: 'pair1',
      factA: { label: 'Doanh số kem (triệu)', data: [2, 4, 8, 10, 12, 10, 8, 4] },
      factB: { label: 'Số vụ đuối nước', data: [5, 10, 20, 25, 30, 22, 18, 8] },
      labels: ['T1', 'T3', 'T5', 'T6', 'T7', 'T8', 'T9', 'T11'],
      correctAnswer: 'correlation',
      explanation: 'Ăn kem không gây đuối nước! Cả hai đều tăng vào mùa hè vì trời nóng — người ta vừa ăn kem nhiều hơn, vừa đi bơi nhiều hơn. Đây là ví dụ kinh điển về "biến số gây nhiễu" (confounding variable).',
      confoundingFactor: 'Thời tiết nóng mùa hè — người ta vừa ăn kem nhiều hơn, vừa tham gia hoạt động dưới nước nhiều hơn.',
    },
    {
      id: 'pair2',
      factA: { label: 'Số bao hút/ngày', data: [0, 5, 10, 15, 20, 25, 30, 40] },
      factB: { label: 'Tỷ lệ ung thư phổi (%)', data: [1, 3, 7, 12, 18, 25, 33, 45] },
      labels: ['0', '5', '10', '15', '20', '25', '30', '40'],
      correctAnswer: 'causation',
      explanation: 'Đây là quan hệ NHÂN QUẢ đã được chứng minh bởi hàng trăm nghiên cứu y khoa. Thuốc lá chứa hơn 70 chất gây ung thư. Hút nhiều hơn = nguy cơ cao hơn theo quan hệ liều lượng - đáp ứng (dose-response relationship).',
    },
  ],
};

// ==========================================
// MOCK DATA — Group G: Timeline & Bối cảnh
// ==========================================

const mockTimelineSorter: TimelineSorterBlock = {
  type: 'timeline-sorter',
  title: 'Các mốc kinh tế Việt Nam',
  instruction: 'Sắp xếp các sự kiện kinh tế quan trọng của Việt Nam theo thứ tự thời gian.',
  events: [
    { id: 'e1', title: 'Đổi Mới', date: '1986', year: 1986, description: 'Đại hội VI quyết định chuyển đổi từ kinh tế kế hoạch tập trung sang kinh tế thị trường định hướng XHCN.' },
    { id: 'e2', title: 'Gia nhập ASEAN', date: '1995', year: 1995, description: 'Việt Nam trở thành thành viên thứ 7 của Hiệp hội các quốc gia Đông Nam Á, mở cửa hội nhập khu vực.' },
    { id: 'e3', title: 'Gia nhập WTO', date: '2007', year: 2007, description: 'Sau 11 năm đàm phán, Việt Nam chính thức gia nhập Tổ chức Thương mại Thế giới, hội nhập sâu vào kinh tế toàn cầu.' },
    { id: 'e4', title: 'CPTPP có hiệu lực', date: '2018', year: 2018, description: 'Hiệp định Đối tác Toàn diện và Tiến bộ xuyên Thái Bình Dương — hiệp định thương mại tự do thế hệ mới với 11 nước.' },
    { id: 'e5', title: 'Phục hồi hậu COVID', date: '2022', year: 2022, description: 'GDP tăng trưởng 8.02% — mức cao nhất trong 25 năm, đánh dấu sự phục hồi mạnh mẽ sau đại dịch.' },
  ],
  connections: [
    { fromId: 'e1', toId: 'e2', description: 'Đổi Mới tạo nền tảng cho việc hội nhập quốc tế, dẫn đến việc gia nhập ASEAN.' },
    { fromId: 'e2', toId: 'e3', description: 'Thành viên ASEAN giúp VN có kinh nghiệm hội nhập, tiến tới gia nhập WTO.' },
    { fromId: 'e3', toId: 'e4', description: 'Sau WTO, VN tiếp tục ký kết các FTA thế hệ mới như CPTPP.' },
  ],
};

const mockCauseEffectChain: CauseEffectChainBlock = {
  type: 'cause-effect-chain',
  title: 'Chuỗi nhân quả: Đô thị hóa Việt Nam',
  instruction: 'Nối các sự kiện thành chuỗi nhân quả hợp lý. Kéo từ một ô sang ô khác để tạo kết nối.',
  nodes: [
    { id: 'n1', text: 'Nghèo đói ở nông thôn — thu nhập nông nghiệp thấp, thiếu việc làm', category: 'Nguyên nhân gốc' },
    { id: 'n2', text: 'Di cư từ nông thôn ra thành thị — người trẻ tìm kiếm cơ hội tốt hơn', category: 'Quá trình' },
    { id: 'n3', text: 'Đô thị hóa nhanh chóng — dân số thành phố tăng vọt', category: 'Hiện tượng' },
    { id: 'n4', text: 'Khủng hoảng nhà ở — giá nhà tăng, khu ổ chuột hình thành, kẹt xe', category: 'Hậu quả' },
    { id: 'n5', text: 'Chính sách phân bổ lại — phát triển nông thôn, xây nhà xã hội, mở rộng thành phố vệ tinh', category: 'Phản ứng chính sách' },
  ],
  correctConnections: [
    { fromId: 'n1', toId: 'n2' },
    { fromId: 'n2', toId: 'n3' },
    { fromId: 'n3', toId: 'n4' },
    { fromId: 'n4', toId: 'n5' },
  ],
  explanation: 'Đô thị hóa là quá trình tất yếu trong phát triển kinh tế, nhưng nếu không được quản lý tốt sẽ dẫn đến nhiều vấn đề xã hội. Chuỗi nhân quả cho thấy: nghèo nông thôn → di cư → đô thị hóa → khủng hoảng nhà ở → chính sách điều chỉnh. Đây là chu kỳ điển hình tại nhiều quốc gia đang phát triển, không riêng Việt Nam.',
};

const mockSpectrumPlacer: SpectrumPlacerBlock = {
  type: 'spectrum-placer',
  title: 'Phổ kinh tế chính trị',
  instruction: 'Kéo từng quốc gia vào vị trí phù hợp trên phổ kinh tế chính trị.',
  spectrum: {
    leftLabel: 'Nhà nước kiểm soát hoàn toàn',
    rightLabel: 'Thị trường tự do hoàn toàn',
    leftDescription: 'Kinh tế kế hoạch tập trung, nhà nước sở hữu toàn bộ tư liệu sản xuất',
    rightDescription: 'Thị trường tự do toàn phần, không có sự can thiệp của nhà nước',
  },
  items: [
    { id: 'cuba', label: 'Cuba', description: 'Kinh tế kế hoạch tập trung, nhà nước sở hữu phần lớn, mới bắt đầu cho phép kinh tế tư nhân nhỏ.', correctPosition: 15, tolerance: 10, explanation: 'Cuba vẫn là một trong những nền kinh tế kế hoạch cuối cùng trên thế giới, dù đã có một số cải cách nhỏ từ 2011.' },
    { id: 'singapore', label: 'Singapore', description: 'Kinh tế thị trường tự do với vai trò định hướng mạnh của nhà nước (nhà ở, y tế, giáo dục).', correctPosition: 75, tolerance: 10, explanation: 'Singapore có môi trường kinh doanh cực kỳ tự do nhưng nhà nước vẫn nắm vai trò lớn trong nhà ở (HDB), y tế và giáo dục.' },
    { id: 'vietnam', label: 'Việt Nam', description: 'Kinh tế thị trường định hướng XHCN — kết hợp thị trường với vai trò chủ đạo của nhà nước.', correctPosition: 40, tolerance: 12, explanation: 'Việt Nam ở vị trí trung tả, nghiêng về nhà nước. Có thị trường tự do nhưng nhà nước vẫn kiểm soát nhiều lĩnh vực then chốt (đất đai, ngân hàng, năng lượng).' },
    { id: 'sweden', label: 'Thụy Điển', description: 'Kinh tế thị trường tự do với hệ thống phúc lợi xã hội rộng lớn, thuế cao.', correctPosition: 60, tolerance: 10, explanation: 'Thụy Điển là "mô hình Bắc Âu" — kinh tế thị trường tự do nhưng có tái phân phối lớn qua thuế và phúc lợi. Không phải "xã hội chủ nghĩa" như nhiều người nhầm.' },
  ],
};

// ==========================================
// MOCK DATA — Group H: AI-Powered (Static)
// ==========================================

const mockSocraticDialog: SocraticDialogBlock = {
  type: 'socratic-dialog',
  title: 'Đối thoại Socrates: Dân chủ là gì?',
  concept: 'Dân chủ là gì?',
  introduction: 'Chúng ta sẽ cùng suy ngẫm về khái niệm "dân chủ" bằng phương pháp Socrates — đặt câu hỏi để tự tìm ra câu trả lời, thay vì nhận đáp án có sẵn. Hãy suy nghĩ thật kỹ trước khi chọn.',
  steps: [
    {
      question: 'Dân chủ có đơn giản là "đa số quyết định" không?',
      options: [
        { id: 's1a', text: 'Đúng, dân chủ là đa số quyết định — càng nhiều phiếu càng đúng.', followUp: 'Nếu 51% bỏ phiếu trục 49% còn lại ra khỏi đất nước thì sao? Đa số có luôn đúng không?', isDeepening: false },
        { id: 's1b', text: 'Không chỉ vậy — dân chủ cần bảo vệ cả quyền của thiểu số.', followUp: 'Rất hay! Nhưng nếu bảo vệ thiểu số đi ngược lại ý muốn đa số, liệu có phải "phản dân chủ" không? Ranh giới ở đâu?', isDeepening: true },
        { id: 's1c', text: 'Tôi không chắc, ví dụ như Đức 1933 bà phiếu cho Hitler...', followUp: 'Đúng! Hitler lên nắm quyền qua bầu cử hợp pháp. Vậy dân chủ chỉ là bầu cử thôi sao, hay cần gì nữa?', isDeepening: true },
      ],
    },
    {
      question: 'Một quốc gia có bầu cử nhưng chỉ có 1 ứng cử viên. Đó có phải dân chủ không?',
      options: [
        { id: 's2a', text: 'Không, vì không có lựa chọn thực sự.', followUp: 'Vậy dân chủ cần "lựa chọn thực sự". Nhưng nếu có 10 ứng cử viên mà tất cả đều do 1 đảng kiểm soát thì sao? "Lựa chọn thực sự" nghĩa là gì?', isDeepening: true },
        { id: 's2b', text: 'Đúng là vẫn có bầu cử, nên vẫn là dân chủ.', followUp: 'Bắc Hàn cũng có "bầu cử" với tỷ lệ đi bầu 99.9%. Bạn có gọi đó là dân chủ không? Hình thức và thực chất khác nhau thế nào?', isDeepening: false },
        { id: 's2c', text: 'Tùy thuộc vào việc người dân có được tự do phản đối không.', followUp: 'Điểm quan trọng! Vậy "quyền phản đối" có phải là thành phần cốt lõi của dân chủ không? Nếu phản đối bị cấm thì bầu cử có ý nghĩa gì?', isDeepening: true },
      ],
    },
    {
      question: 'Nếu người dân thích ổn định hơn tự do, họ có "quyền" chọn một chế độ độc tài không?',
      options: [
        { id: 's3a', text: 'Có — nếu đa số muốn, đó là quyền tự quyết của họ.', followUp: 'Nhưng nếu họ "chọn" xong rồi không thể thay đổi quyết định nữa thì sao? Có thể dân chủ "tự hủy" chính nó được không?', isDeepening: true },
        { id: 's3b', text: 'Không — dân chủ là quyền cơ bản, không thể bị từ bỏ.', followUp: 'Nhưng ai quyết định rằng dân chủ là "quyền cơ bản"? Nếu chính người dân từ bỏ nó thì ai có quyền nói họ "sai"?', isDeepening: true },
        { id: 's3c', text: 'Đây là câu hỏi quá phức tạp, không có đáp án đơn giản.', followUp: 'Chính xác! Và đó là lý do tại sao triết học chính trị tồn tại. Không có câu trả lời hoàn hảo — chỉ có câu trả lời "ít tệ nhất".', isDeepening: false },
      ],
    },
  ],
  revelation: 'Dân chủ không phải một trạng thái cố định mà là một QUÁ TRÌNH liên tục. Nó không chỉ là bầu cử (hình thức), mà còn là quyền tự do ngôn luận, bảo vệ thiểu số, pháp quyền, và khả năng tự sửa chữa sai lầm (thực chất). Nhiều nhà tư tưởng — từ Plato (nghi ngờ dân chủ) đến Amartya Sen (dân chủ như tự do) — đã tranh luận về điều này suốt 2,500 năm. Không có đáp án cuối cùng, nhưng việc đặt câu hỏi đã là bước đầu của tư duy dân chủ.',
};

const mockAiEssayReview: AiEssayReviewBlock = {
  type: 'ai-essay-review',
  title: 'Bài luận phân tích',
  prompt: 'Phân tích tác động của mạng xã hội đối với nền dân chủ. Hãy xem xét cả mặt tích cực (tăng tiếng nói công dân, minh bạch thông tin) và mặt tiêu cực (tin giả, phân cực, thao túng dư luận).',
  minWords: 100,
  maxWords: 500,
  rubric: [
    { id: 'depth', label: 'Độ sâu phân tích', description: 'Phân tích nhiều góc độ, không chỉ liệt kê mà còn giải thích cơ chế và hậu quả.', keywords: ['ví dụ', 'cơ chế', 'hậu quả', 'nguyên nhân', 'tác động'], maxScore: 5 },
    { id: 'evidence', label: 'Sử dụng bằng chứng', description: 'Dẫn chứng cụ thể: số liệu, sự kiện, nghiên cứu, ví dụ thực tế từ các quốc gia.', keywords: ['nghiên cứu', 'số liệu', 'theo', 'năm', 'báo cáo', 'ví dụ'], maxScore: 5 },
    { id: 'balance', label: 'Góc nhìn cân bằng', description: 'Trình bày cả mặt tích cực và tiêu cực, tránh thiên lệch một phía.', keywords: ['tuy nhiên', 'mặt khác', 'nhưng', 'đồng thời', 'trái lại'], maxScore: 5 },
  ],
  sampleResponse: 'Mạng xã hội đã thay đổi căn bản cách công dân tham gia vào đời sống chính trị. Về mặt tích cực, các nền tảng như Facebook và Twitter cho phép người dân giám sát chính quyền, lan truyền thông tin về tham nhũng và tổ chức biểu tình (như Mùa xuân Ả Rập 2011). Tuy nhiên, mặt tiêu cực cũng nghiêm trọng: tin giả lan truyền nhanh gấp 6 lần tin thật (nghiên cứu MIT 2018), thuật toán tạo "bong bóng lọc" khiến người dùng chỉ thấy thông tin họ đồng ý, và các chính phủ độc tài sử dụng bot để thao túng dư luận. Giải pháp cần kết hợp: giáo dục media literacy, quy định minh bạch thuật toán, và bảo vệ quyền tự do ngôn luận.',
  tips: [
    'Bắt đầu bằng một luận điểm rõ ràng (thesis statement).',
    'Dùng ví dụ cụ thể từ ít nhất 2 quốc gia để minh họa.',
    'Xem xét cả 2 mặt: tích cực và tiêu cực.',
    'Kết luận bằng đề xuất giải pháp hoặc suy ngẫm cá nhân.',
  ],
};

const mockScenarioWhatIf: ScenarioWhatIfBlock = {
  type: 'scenario-what-if',
  title: 'Lịch sử giả định',
  scenario: 'Nếu Việt Nam không thực hiện Đổi Mới năm 1986?',
  historicalContext: 'Trước 1986, Việt Nam áp dụng mô hình kinh tế kế hoạch tập trung (bao cấp). Kết quả: lạm phát lên tới 700%, thiếu lương thực trầm trọng, GDP/người chỉ đạt ~100 USD. Người dân phải xếp hàng mua gạo với tem phiếu. Đại hội VI (12/1986) quyết định "Đổi Mới" — chuyển sang kinh tế thị trường định hướng XHCN.',
  predictions: [
    { id: 'p1', text: 'Việt Nam sẽ đi theo con đường của Triều Tiên — cô lập kinh tế, dân nghèo dai dẳng, phụ thuộc viện trợ nước ngoài.', likelihood: 'possible', explanation: 'Có khả năng nhưng không chắc chắn. Việt Nam có quan hệ với nhiều nước hơn Triều Tiên và có truyền thống thương mại lâu đời. Tuy nhiên, nếu không cải cách, cô lập kinh tế là điều khó tránh.' },
    { id: 'p2', text: 'Sẽ có Đổi Mới muộn hơn (năm 1990-1995) do áp lực từ sự sụp đổ của Liên Xô.', likelihood: 'likely', explanation: 'Rất có khả năng. Sự sụp đổ của Liên Xô (1991) khiến mất nguồn viện trợ chính, buộc phải cải cách. Nhiều nước XHCN đã làm tương tự (Cuba cải cách từ 1990s, Lào từ 1986).' },
    { id: 'p3', text: 'Kinh tế tăng trưởng nhờ phát hiện dầu khí ở Vũng Tàu, dù không có cải cách toàn diện.', likelihood: 'possible', explanation: 'Dầu khí có thể mang lại ngoại tệ nhưng không đủ để phát triển toàn diện. Venezuela có dầu nhưng vẫn khủng hoảng vì chính sách kinh tế sai lầm.' },
    { id: 'p4', text: 'Chế độ chính trị sẽ thay đổi hoàn toàn, chuyển sang đa đảng như Đông Âu.', likelihood: 'unlikely', explanation: 'Ít khả năng vì Việt Nam có bối cảnh khác Đông Âu: không có "hiệu ứng domino" từ Liên Xô sụp đổ theo cách tương tự, và Đảng đã chọn cải cách kinh tế trước để giữ ổn định chính trị.' },
  ],
  realOutcome: 'Đổi Mới 1986 đã tạo ra phép màu kinh tế: GDP/người từ ~100 USD (1986) lên 4,284 USD (2023), tỷ lệ nghèo giảm từ 58% xuống 4.4%, Việt Nam trở thành "công xưởng thế giới" và thành viên của WTO, ASEAN, CPTPP.',
  analysis: 'Bài học lịch sử: thời điểm cải cách rất quan trọng. Nếu chậm 5-10 năm, Việt Nam có thể mất "cửa sổ cơ hội" hội nhập kinh tế toàn cầu (khi Trung Quốc và các nước ASEAN đã chiếm lĩnh thị trường). Đổi Mới không chỉ là chính sách kinh tế — đó là quyết định mang tính sống còn của cả dân tộc.',
};

// ==========================================
// PAGE COMPONENT
// ==========================================

export default function BlockDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/contributor-guide" className="text-sm text-blue-600 hover:text-blue-800 mb-4 inline-block">
            &larr; Quay lại Contributor Guide
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Công cụ tương tác trên Tepup</h1>
          <p className="text-gray-500">Khám phá tất cả các loại block tương tác mà người đóng góp có thể sử dụng trong bài học.</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">A: Tính toán</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">B: Tư duy phản biện</span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">C: Mini-game</span>
            <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium">D: Lập luận</span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">E: Mô phỏng</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">F: Media Literacy</span>
            <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-medium">G: Timeline</span>
            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">H: AI-Powered</span>
          </div>
        </div>

        {/* NHÓM A */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-sm">A</span>
            Công cụ tính toán / Simulator
          </h2>

          <div className="mb-2 text-sm text-gray-500 font-medium">A1. Calculator</div>
          <CalculatorBlockComponent block={mockCalculator} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">A2. Slider Simulator</div>
          <SliderSimulatorBlockComponent block={mockSliderSimulator} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">A3. Budget Allocator</div>
          <BudgetAllocatorBlockComponent block={mockBudgetAllocator} onComplete={() => {}} />
        </section>

        {/* NHÓM B */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-sm">B</span>
            Tư duy phản biện
          </h2>

          <div className="mb-2 text-sm text-gray-500 font-medium">B1. Bias Detector</div>
          <BiasDetectorBlockComponent block={mockBiasDetector} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">B2. Stat Trick</div>
          <StatTrickBlockComponent block={mockStatTrick} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">B3. Perspective Switch</div>
          <PerspectiveSwitchBlockComponent block={mockPerspectiveSwitch} onComplete={() => {}} />
        </section>

        {/* NHÓM C */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-sm">C</span>
            Mini-game / Puzzle
          </h2>

          <div className="mb-2 text-sm text-gray-500 font-medium">C1. Hot Cold Guess</div>
          <HotColdGuessBlockComponent block={mockHotColdGuess} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">C2. Redacted Document</div>
          <RedactedDocumentBlockComponent block={mockRedactedDocument} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">C3. Hidden Pattern</div>
          <HiddenPatternBlockComponent block={mockHiddenPattern} onComplete={() => {}} />
        </section>

        {/* NHÓM D */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-rose-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-sm">D</span>
            Lập luận & Tranh luận
          </h2>

          <div className="mb-2 text-sm text-gray-500 font-medium">D1. Debate Arena</div>
          <DebateArenaBlockComponent block={mockDebateArena} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">D2. Argument Mapper</div>
          <ArgumentMapperBlockComponent block={mockArgumentMapper} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">D3. Fact or Opinion</div>
          <FactOrOpinionBlockComponent block={mockFactOrOpinion} onComplete={() => {}} />
        </section>

        {/* NHÓM E */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-sm">E</span>
            Mô phỏng & Ra quyết định
          </h2>

          <div className="mb-2 text-sm text-gray-500 font-medium">E1. Decision Tree</div>
          <DecisionTreeBlockComponent block={mockDecisionTree} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">E2. Prisoner Dilemma</div>
          <PrisonerDilemmaBlockComponent block={mockPrisonerDilemma} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">E3. Policy Lab</div>
          <PolicyLabBlockComponent block={mockPolicyLab} onComplete={() => {}} />
        </section>

        {/* NHÓM F */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-sm">F</span>
            Media Literacy
          </h2>

          <div className="mb-2 text-sm text-gray-500 font-medium">F1. Source Ranker</div>
          <SourceRankerBlockComponent block={mockSourceRanker} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">F2. Propaganda Detector</div>
          <PropagandaDetectorBlockComponent block={mockPropagandaDetector} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">F3. Correlation vs Causation</div>
          <CorrelationCausationBlockComponent block={mockCorrelationCausation} onComplete={() => {}} />
        </section>

        {/* NHÓM G */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-violet-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center text-sm">G</span>
            Timeline & Bối cảnh
          </h2>

          <div className="mb-2 text-sm text-gray-500 font-medium">G1. Timeline Sorter</div>
          <TimelineSorterBlockComponent block={mockTimelineSorter} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">G2. Cause & Effect Chain</div>
          <CauseEffectChainBlockComponent block={mockCauseEffectChain} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">G3. Spectrum Placer</div>
          <SpectrumPlacerBlockComponent block={mockSpectrumPlacer} onComplete={() => {}} />
        </section>

        {/* NHÓM H */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-pink-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-sm">H</span>
            AI-Powered (Static)
          </h2>

          <div className="mb-2 text-sm text-gray-500 font-medium">H1. Socratic Dialog</div>
          <SocraticDialogBlockComponent block={mockSocraticDialog} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">H2. AI Essay Review</div>
          <AiEssayReviewBlockComponent block={mockAiEssayReview} onComplete={() => {}} />

          <div className="mb-2 text-sm text-gray-500 font-medium">H3. Scenario What-If</div>
          <ScenarioWhatIfBlockComponent block={mockScenarioWhatIf} onComplete={() => {}} />
        </section>
      </div>
    </div>
  );
}
