# Design QA

## 对照信息

- source visual truth path：`/var/folders/dg/0bk79r8j7ll7rv1_fgvj4td00000gn/T/codex-clipboard-31e48b0a-77b1-4fd3-9dfd-7b6a89dc88ca.png`
- implementation screenshot path：`/Users/kar/Documents/工作/需求输出/事件管理新增循环设置_20260730/交互原型/原型截图_初始状态.png`
- combined comparison evidence：`/Users/kar/Documents/工作/需求输出/事件管理新增循环设置_20260730/交互原型/设计对照.png`
- viewport：1224 × 986 CSS px
- source pixels：1224 × 986
- implementation pixels：1224 × 988
- density normalization：两者均按 1× 像素密度、等宽显示对照；2 px 高度差来自浏览器页面截取边界，不影响弹窗区域判断。
- state：新增事件弹窗初始状态；循环设置未选择，循环周期隐藏。

## Full-view comparison

- 弹窗结构、标题栏、遮罩、左右两列表单、底部按钮区与线上参考保持一致。
- 新增的循环设置行插入在起止时间下方；未选择、不重复或每天时，右侧循环周期隐藏且下方字段不发生横向换位。
- 原型使用真实示例数据，线上参考为空值；这是为前端理解交互而保留的内容差异，不属于视觉漂移。

## Focused region comparison

- 标题与头部：蓝色竖线、标题字重、关闭按钮位置、分割线结构一致。
- 表单区：标签右对齐、必填星号、48 px 控件高度、边框与圆角接近线上样式。
- 循环设置区：沿用线上双列网格；每周/每月时右侧显示标签式多选框及下拉勾选状态。
- 底部操作区：取消为浅蓝次按钮，确定为蓝色主按钮，位置与线上参考一致。

## Required fidelity surfaces

- Fonts and typography：使用系统中文 UI 字体栈，标题、标签、正文层级清晰；无异常换行或截断。
- Spacing and layout rhythm：弹窗、表单网格、标签对齐与上下间距稳定；新增字段导致的信息密度增加属于需求本身。
- Colors and visual tokens：主色、边框、占位符、遮罩、选中态均与线上蓝灰体系一致。
- Image quality and asset fidelity：页面不依赖业务图片；图标使用 Ant Design 图标库，没有使用占位图或手绘图标。
- Copy and content：已覆盖门店默认提示、事件折扣率提示、循环设置、循环周期及保存结果文案。

## Interactions tested

- 未选择循环设置点击确定：提示“请选择循环设置”。
- 选择每周：显示周一至周日，可多选周三、周五并以标签回显。
- 从每周切换每月：自动清空原星期值。
- 选择每月：显示1号至31号，可多选8号、18号并以标签回显。
- 每周完成配置后点击确定：显示“保存校验通过”及所选周期。
- 浏览器控制台 warning / error：0。

## Findings

- 无 P0 / P1 / P2 问题。
- P3：原型为说明交互填入了示例值，研发实现时新增态仍应按需求默认值处理。

## Comparison history

- 第一次对照发现原型内存在额外“交互说明”提示条，会被误解为正式产品元素；已删除并恢复备注区域高度。
- 修复后重新以相同视口捕获并对照，未发现剩余 P0 / P1 / P2 差异。

## Implementation checklist

- 保持循环设置位于起止时间下方左栏。
- 循环周期仅在每周/每月时显示在右栏。
- 切换循环类型时清空旧周期值。
- 按需求校验循环设置、循环周期和事件折扣率。

final result: passed
