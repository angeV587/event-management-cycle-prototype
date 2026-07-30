import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
  DownOutlined,
  InfoCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const cycleOptions = ["不重复", "每天", "每周", "每月"];
const weekOptions = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const monthOptions = Array.from({ length: 31 }, (_, index) => `${index + 1}号`);

function Field({ label, required, full, children, className = "" }) {
  return (
    <div className={`field ${full ? "field-full" : ""} ${className}`}>
      <label className="field-label">
        {required && <span className="required">*</span>}
        {label}
      </label>
      <div className="field-control">{children}</div>
    </div>
  );
}

function SelectBox({ value, placeholder = "请选择", options, onChange, testId }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="select-wrap" ref={ref}>
      <button
        type="button"
        className={`control select-trigger ${open ? "active" : ""}`}
        onClick={() => setOpen((current) => !current)}
        data-testid={testId}
      >
        <span className={value ? "" : "placeholder"}>{value || placeholder}</span>
        <DownOutlined className={`select-arrow ${open ? "rotate" : ""}`} />
      </button>
      {open && (
        <div className="dropdown single-menu">
          {options.map((option) => (
            <button
              type="button"
              className={`option ${option === value ? "selected" : ""}`}
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              <span>{option}</span>
              {option === value && <CheckOutlined />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MultiSelect({ options, values, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggle = (option) => {
    onChange(values.includes(option) ? values.filter((item) => item !== option) : [...values, option]);
  };

  return (
    <div className="select-wrap" ref={ref}>
      <button
        type="button"
        className={`control multi-trigger ${open ? "active" : ""}`}
        onClick={() => setOpen((current) => !current)}
        data-testid="cycle-period"
      >
        <span className="tag-area">
          {values.length === 0 && <span className="placeholder">请选择</span>}
          {values.map((value) => (
            <span className="tag" key={value}>
              {value}
              <CloseOutlined
                className="tag-close"
                onClick={(event) => {
                  event.stopPropagation();
                  onChange(values.filter((item) => item !== value));
                }}
              />
            </span>
          ))}
        </span>
        <DownOutlined className={`select-arrow ${open ? "rotate" : ""}`} />
      </button>
      {open && (
        <div className="dropdown multi-menu">
          {options.map((option) => {
            const selected = values.includes(option);
            return (
              <button
                type="button"
                className={`option ${selected ? "selected" : ""}`}
                key={option}
                onClick={() => toggle(option)}
              >
                <span>{option}</span>
                {selected && <CheckOutlined />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function App() {
  const [cycleType, setCycleType] = useState("");
  const [periods, setPeriods] = useState([]);
  const [discount, setDiscount] = useState("0.1");
  const [toast, setToast] = useState("");
  const [saved, setSaved] = useState(false);

  const periodOptions = useMemo(
    () => (cycleType === "每周" ? weekOptions : monthOptions),
    [cycleType],
  );
  const showPeriod = cycleType === "每周" || cycleType === "每月";

  const changeCycle = (nextValue) => {
    if (nextValue !== cycleType) setPeriods([]);
    setCycleType(nextValue);
    setSaved(false);
  };

  const confirm = () => {
    const discountValue = Number(discount);
    if (!cycleType) {
      setToast("请选择循环设置");
      return;
    }
    if (showPeriod && periods.length === 0) {
      setToast("请选择循环周期");
      return;
    }
    if (!discount || Number.isNaN(discountValue) || discountValue <= 0 || discountValue > 1) {
      setToast("事件折扣率须大于0且小于等于1");
      return;
    }
    setToast("");
    setSaved(true);
  };

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <div className="prototype-shell">
      <div className="background-page" aria-hidden="true">
        <div className="page-topbar">
          <div className="brand-block" />
          <div className="nav-pill" />
          <div className="nav-pill short" />
          <div className="top-spacer" />
          <div className="round-dot" />
          <div className="user-line" />
        </div>
        <aside className="side">
          {Array.from({ length: 9 }, (_, index) => (
            <div className={`side-line ${index === 4 ? "active" : ""}`} key={index} />
          ))}
        </aside>
        <main className="page-content">
          <div className="page-title-row">
            <div className="page-title" />
            <div className="primary-mini" />
          </div>
          <div className="query-panel">
            {Array.from({ length: 8 }, (_, index) => (
              <div className="query-item" key={index} />
            ))}
          </div>
          <div className="table-head" />
          {Array.from({ length: 7 }, (_, index) => (
            <div className="table-row" key={index} />
          ))}
        </main>
      </div>

      <div className="mask" />
      <section className="modal" aria-label="新增事件弹窗">
        <header className="modal-header">
          <h1><span className="title-accent" />新增事件</h1>
          <button className="icon-button" type="button" aria-label="关闭">
            <CloseOutlined />
          </button>
        </header>

        <div className="modal-body">
          <div className="form-grid">
            <Field label="事件名称：" required full>
              <input className="control" placeholder="请输入" defaultValue="周三会员日" />
            </Field>

            <Field label="门店名称：" full>
              <div className="search-control">
                <input className="control" placeholder="为空默认应用到所有门店" />
                <button type="button" className="search-button" aria-label="选择门店">
                  <SearchOutlined />
                </button>
              </div>
            </Field>

            <Field label="起止时间：" required full>
              <div className="date-range control">
                <span>2026-08-01</span>
                <span className="date-separator">至</span>
                <span>2026-12-31</span>
                <CalendarOutlined />
              </div>
            </Field>

            <Field label="循环设置：" required>
              <SelectBox
                value={cycleType}
                options={cycleOptions}
                onChange={changeCycle}
                testId="cycle-type"
              />
            </Field>

            <Field
              label="循环周期："
              required={showPeriod}
              className={!showPeriod ? "conditional-hidden" : ""}
            >
              {showPeriod && (
                <MultiSelect options={periodOptions} values={periods} onChange={setPeriods} />
              )}
            </Field>

            <Field label="是否放假：" required>
              <SelectBox value="否" options={["是", "否"]} onChange={() => {}} />
            </Field>
            <Field label="类型：" required>
              <SelectBox value="门店活动" options={["门店活动", "特殊节日", "会员日", "节假日"]} onChange={() => {}} />
            </Field>

            <Field label="事件折扣率：">
              <div className="discount-wrap">
                <input
                  className="control discount-input"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                  aria-label="事件折扣率"
                />
                <span className="discount-suffix">折扣率</span>
                <span className="tip-wrap">
                  <InfoCircleOutlined />
                  <span className="tooltip">0.1代表1折，0.8代表8折，1代表不打折</span>
                </span>
              </div>
            </Field>
            <Field label="类别：" required>
              <SelectBox value="事件" options={["事件", "临时装修"]} onChange={() => {}} />
            </Field>

            <Field label="状态：" required>
              <div className="radio-group">
                <label><input type="radio" name="status" defaultChecked /> <span>启用</span></label>
                <label><input type="radio" name="status" /> <span>停用</span></label>
              </div>
            </Field>
            <div />

            <Field label="备注：" full>
              <div className="textarea-wrap">
                <textarea placeholder="请输入" maxLength={500} defaultValue="每周固定会员日活动" />
                <span>10 / 500</span>
              </div>
            </Field>
          </div>

        </div>

        <footer className="modal-footer">
          <button type="button" className="button secondary">取消</button>
          <button type="button" className="button primary" onClick={confirm}>确定</button>
        </footer>
      </section>

      {toast && <div className="toast error">{toast}</div>}
      {saved && (
        <div className="result-card" data-testid="save-success">
          <CheckOutlined />
          <div>
            <strong>保存校验通过</strong>
            <span>
              {cycleType}
              {showPeriod ? ` · ${periods.join("、")}` : " · 不展示循环周期"}
            </span>
          </div>
          <button type="button" onClick={() => setSaved(false)} aria-label="关闭结果">
            <CloseOutlined />
          </button>
        </div>
      )}
    </div>
  );
}
