'use client';

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
} from '@/lib/types/content';

// ==========================================
// MOCK DATA — Vietnamese Social Science Content
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

export default function DevBlocksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gamification Blocks — Test Page</h1>
          <p className="text-gray-500">9 block types mới cho Tepup. Trang này dùng mock data, không kết nối DB.</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">Nhóm A: Tính toán</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Nhóm B: Tư duy phản biện</span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">Nhóm C: Mini-game</span>
          </div>
        </div>

        {/* NHÓM A */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-sm">A</span>
            Công cụ tính toán / Simulator
          </h2>

          <div className="mb-2 text-sm text-gray-500 font-medium">A1. Calculator</div>
          <CalculatorBlockComponent block={mockCalculator} onComplete={() => console.log('Calculator complete')} />

          <div className="mb-2 text-sm text-gray-500 font-medium">A2. Slider Simulator</div>
          <SliderSimulatorBlockComponent block={mockSliderSimulator} onComplete={() => console.log('Slider complete')} />

          <div className="mb-2 text-sm text-gray-500 font-medium">A3. Budget Allocator</div>
          <BudgetAllocatorBlockComponent block={mockBudgetAllocator} onComplete={() => console.log('Budget complete')} />
        </section>

        {/* NHÓM B */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-sm">B</span>
            Tư duy phản biện
          </h2>

          <div className="mb-2 text-sm text-gray-500 font-medium">B1. Bias Detector</div>
          <BiasDetectorBlockComponent block={mockBiasDetector} onComplete={() => console.log('Bias complete')} />

          <div className="mb-2 text-sm text-gray-500 font-medium">B2. Stat Trick</div>
          <StatTrickBlockComponent block={mockStatTrick} onComplete={() => console.log('Stat complete')} />

          <div className="mb-2 text-sm text-gray-500 font-medium">B3. Perspective Switch</div>
          <PerspectiveSwitchBlockComponent block={mockPerspectiveSwitch} onComplete={() => console.log('Perspective complete')} />
        </section>

        {/* NHÓM C */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-sm">C</span>
            Mini-game / Puzzle
          </h2>

          <div className="mb-2 text-sm text-gray-500 font-medium">C1. Hot Cold Guess</div>
          <HotColdGuessBlockComponent block={mockHotColdGuess} onComplete={() => console.log('HotCold complete')} />

          <div className="mb-2 text-sm text-gray-500 font-medium">C2. Redacted Document</div>
          <RedactedDocumentBlockComponent block={mockRedactedDocument} onComplete={() => console.log('Redacted complete')} />

          <div className="mb-2 text-sm text-gray-500 font-medium">C3. Hidden Pattern</div>
          <HiddenPatternBlockComponent block={mockHiddenPattern} onComplete={() => console.log('Pattern complete')} />
        </section>
      </div>
    </div>
  );
}
