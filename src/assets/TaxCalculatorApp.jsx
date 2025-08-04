import React, { useState } from 'react';
import { Calculator, Menu, X, ChevronRight, Receipt, DollarSign, Percent, ShoppingCart, FileText } from 'lucide-react';

const TaxCalculatorApp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('tax-calculator');
  
  // Tax Calculator States
  const [selectedTaxRate, setSelectedTaxRate] = useState(3);
  const [desiredAmount, setDesiredAmount] = useState('');
  const [result, setResult] = useState(null);

  // VAT Calculator States
  const [vatType, setVatType] = useState('exclude'); // 'exclude' = VAT นอก, 'include' = VAT ใน
  const [vatRate, setVatRate] = useState(7);
  const [vatAmount, setVatAmount] = useState('');
  const [vatResult, setVatResult] = useState(null);

  const taxRates = [1, 2, 3, 5, 10];

  // Helper function to clean and parse number input
  const parseNumberInput = (input) => {
    if (!input) return NaN;
    // Remove commas and spaces, then parse
    const cleaned = input.toString().replace(/,/g, '').replace(/\s/g, '');
    return parseFloat(cleaned);
  };

  // Helper function to format number with commas while typing
  const formatNumberInput = (value) => {
    if (!value) return '';
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    // Split by decimal point
    const parts = numericValue.split('.');
    // Add commas to integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // Rejoin with decimal point if exists
    return parts.length > 1 ? parts[0] + '.' + parts[1] : parts[0];
  };

  const calculateInvoice = () => {
    const amount = parseNumberInput(desiredAmount);
    
    if (isNaN(amount) || amount <= 0) {
      alert('กรุณากรอกจำนวนเงินที่ถูกต้อง');
      return;
    }

    const taxRateDecimal = selectedTaxRate / 100;
    const invoiceAmount = amount / (1 - taxRateDecimal);
    const taxAmount = invoiceAmount * taxRateDecimal;

    setResult({
      invoiceAmount: invoiceAmount,
      taxAmount: taxAmount,
      netAmount: amount
    });
  };

  const calculateVAT = () => {
    const amount = parseNumberInput(vatAmount);
    
    if (isNaN(amount) || amount <= 0) {
      alert('กรุณากรอกจำนวนเงินที่ถูกต้อง');
      return;
    }

    const vatRateDecimal = vatRate / 100;
    let baseAmount, vatValue, totalAmount;

    if (vatType === 'exclude') {
      // VAT นอก: ราคาที่กรอกคือราคาก่อน VAT
      baseAmount = amount;
      vatValue = baseAmount * vatRateDecimal;
      totalAmount = baseAmount + vatValue;
    } else {
      // VAT ใน: ราคาที่กรอกคือราคารวม VAT แล้ว
      totalAmount = amount;
      baseAmount = totalAmount / (1 + vatRateDecimal);
      vatValue = totalAmount - baseAmount;
    }

    setVatResult({
      baseAmount: baseAmount,
      vatValue: vatValue,
      totalAmount: totalAmount
    });
  };

  const formatNumber = (number) => {
    return number.toLocaleString('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const menuItems = [
    {
      id: 'tax-calculator',
      name: 'คำนวณภาษีหัก ณ ที่จ่าย',
      icon: Calculator,
      description: 'คำนวณย้อนกลับจากเงินที่ต้องการรับ'
    },
    {
      id: 'vat-calculator',
      name: 'คำนวณ VAT',
      icon: ShoppingCart,
      description: 'คำนวณ VAT ใน และ VAT นอก'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center space-x-3">
            <img 
              src="/Image/logo-psi.png" 
              alt="PSI Logo" 
              className="h-10 w-auto"
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              TAX Tools
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeMenu === item.id
                  ? 'bg-purple-100 text-purple-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
              <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                activeMenu === item.id ? 'rotate-90' : ''
              }`} />
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {menuItems.find(item => item.id === activeMenu)?.name}
            </h2>
            <div className="w-10" /> {/* Spacer for center alignment */}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50 to-blue-50 p-4 lg:p-8">
          {activeMenu === 'tax-calculator' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                {/* Tax Rate Selector */}
                <div className="mb-8">
                  <label className="flex items-center text-gray-700 font-medium mb-4">
                    <Percent className="w-5 h-5 mr-2" />
                    เลือกอัตราภาษีหัก ณ ที่จ่าย
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {taxRates.map((rate) => (
                      <button
                        key={rate}
                        onClick={() => setSelectedTaxRate(rate)}
                        className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                          selectedTaxRate === rate
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Section */}
                <div className="mb-6">
                  <label className="flex items-center text-gray-700 font-medium mb-3">
                    <DollarSign className="w-5 h-5 mr-2" />
                    จำนวนเงินที่ต้องการรับจริง (บาท)
                  </label>
                  <input
                    type="text"
                    value={desiredAmount}
                    onChange={(e) => {
                      const formatted = formatNumberInput(e.target.value);
                      setDesiredAmount(formatted);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && calculateInvoice()}
                    placeholder="เช่น 1,200.00"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-lg"
                  />
                </div>

                {/* Calculate Button */}
                <button
                  onClick={calculateInvoice}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-medium text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  คำนวณจำนวนเงินที่ต้องออกบิล
                </button>

                {/* Result Section */}
                {result && (
                  <div className="mt-8 space-y-4 animate-fadeIn">
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Receipt className="w-6 h-6 text-purple-600 mr-3" />
                          <span className="text-gray-700 font-medium">ต้องออกบิล</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-700">
                          {formatNumber(result.invoiceAmount)} บาท
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">หักภาษี ณ ที่จ่าย ({selectedTaxRate}%)</span>
                        <span className="font-semibold text-red-600">
                          -{formatNumber(result.taxAmount)} บาท
                        </span>
                      </div>
                      <div className="border-t pt-3 flex justify-between items-center">
                        <span className="text-gray-600">รับเงินสุทธิ</span>
                        <span className="font-semibold text-green-600 text-xl">
                          {formatNumber(result.netAmount)} บาท
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Example Box */}
                <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">💡 ตัวอย่างการคำนวณ</h3>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    หากต้องการรับเงิน 1,200 บาท และมีการหักภาษี ณ ที่จ่าย 3%
                    ระบบจะคำนวณว่าต้องออกบิล 1,237.11 บาท
                    (หักภาษี 37.11 บาท คงเหลือรับสุทธิ 1,200 บาท)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* VAT Calculator */}
          {activeMenu === 'vat-calculator' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                {/* VAT Type Selector */}
                <div className="mb-8">
                  <label className="flex items-center text-gray-700 font-medium mb-4">
                    <FileText className="w-5 h-5 mr-2" />
                    เลือกประเภทการคำนวณ VAT
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setVatType('exclude')}
                      className={`py-4 px-6 rounded-xl font-medium transition-all duration-200 flex flex-col items-center ${
                        vatType === 'exclude'
                          ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg transform scale-105'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <span className="text-lg font-semibold">VAT นอก</span>
                      <span className="text-sm mt-1 opacity-80">ราคาก่อน VAT → รวม VAT</span>
                    </button>
                    <button
                      onClick={() => setVatType('include')}
                      className={`py-4 px-6 rounded-xl font-medium transition-all duration-200 flex flex-col items-center ${
                        vatType === 'include'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <span className="text-lg font-semibold">VAT ใน</span>
                      <span className="text-sm mt-1 opacity-80">ราคารวม VAT → หัก VAT</span>
                    </button>
                  </div>
                </div>

                {/* VAT Rate Selector */}
                <div className="mb-8">
                  <label className="flex items-center text-gray-700 font-medium mb-4">
                    <Percent className="w-5 h-5 mr-2" />
                    อัตรา VAT
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setVatRate(7)}
                      className={`py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
                        vatRate === 7
                          ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      7%
                    </button>
                    <span className="text-gray-500">หรือ</span>
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={vatRate}
                        onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
                        className="w-20 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-center"
                        min="0"
                        max="100"
                        step="0.1"
                      />
                      <span className="ml-2 text-gray-700">%</span>
                    </div>
                  </div>
                </div>

                {/* Input Section */}
                <div className="mb-6">
                  <label className="flex items-center text-gray-700 font-medium mb-3">
                    <DollarSign className="w-5 h-5 mr-2" />
                    {vatType === 'exclude' ? 'จำนวนเงินก่อน VAT (บาท)' : 'จำนวนเงินรวม VAT แล้ว (บาท)'}
                  </label>
                  <input
                    type="text"
                    value={vatAmount}
                    onChange={(e) => {
                      const formatted = formatNumberInput(e.target.value);
                      setVatAmount(formatted);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && calculateVAT()}
                    placeholder="เช่น 1,000.00"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors text-lg"
                  />
                </div>

                {/* Calculate Button */}
                <button
                  onClick={calculateVAT}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-medium text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  คำนวณ VAT
                </button>

                {/* Result Section */}
                {vatResult && (
                  <div className="mt-8 space-y-4 animate-fadeIn">
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-gray-600">ราคาก่อน VAT</span>
                        <span className="font-semibold text-lg">
                          {formatNumber(vatResult.baseAmount)} บาท
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-gray-600">VAT {vatRate}%</span>
                        <span className="font-semibold text-lg text-orange-600">
                          {formatNumber(vatResult.vatValue)} บาท
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-4 -mx-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium">ราคารวม VAT</span>
                          <span className="text-2xl font-bold text-green-700">
                            {formatNumber(vatResult.totalAmount)} บาท
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Example Box */}
                <div className="mt-8 bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">💡 ตัวอย่างการคำนวณ</h3>
                  <div className="text-green-700 text-sm space-y-2">
                    <p>
                      <strong>VAT นอก:</strong> สินค้าราคา 1,000 บาท + VAT 7% = 70 บาท | รวมทั้งหมด 1,070 บาท
                    </p>
                    <p>
                      <strong>VAT ใน:</strong> สินค้าราคารวม VAT 1,070 บาท | ราคาก่อน VAT = 1,000 บาท, VAT = 70 บาท
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TaxCalculatorApp;