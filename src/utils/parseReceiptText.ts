export function parseReceiptText(text: string) {
    const valueMatch = text.match(/\d+[\.,]\d{2}/g);
    let amount = '';
    if (valueMatch) {
      const normalized = valueMatch.map((val) => parseFloat(val.replace(',', '.')));
      amount = Math.max(...normalized).toFixed(2);
    }
    const dateMatch = text.match(/\d{2}[\/\-]\d{2}[\/\-]\d{4}|\d{4}[\/\-]\d{2}[\/\-]\d{2}/);
    const description = text.split('\n').slice(0, 3).join(' ');
  
    return {
      date: dateMatch?.[0] || new Date().toISOString().split('T')[0],
      value: amount || '',
      description
    };
  }