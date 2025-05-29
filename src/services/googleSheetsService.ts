import Constants from 'expo-constants';

type ExpenseData = {
  date: string;
  amount: string;
  description: string;
  paidBy?: 'Rafael' | 'João';
  split?: boolean;
};

export async function submitExpense(expense: ExpenseData) {
  const GOOGLE_SHEETS_WEBHOOK_URL = Constants.expoConfig?.extra?.GOOGLE_SHEETS_WEBHOOK_URL || '';

  try {
    console.log('Submitting...', expense);
    console.log(JSON.stringify({ date: expense.date, amount: expense.amount, description: expense.description, whoPaid: expense.paidBy, split: expense.split }));
    console.log('GOOGLE_SCRIPT_URL',GOOGLE_SHEETS_WEBHOOK_URL);
    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: expense.date, amount: expense.amount, description: expense.description, whoPaid: expense.paidBy, split: expense.split })
    });
    const result = await response.text();
    //console.log(result);
    alert(result);
    //await axios.post(GOOGLE_SHEETS_WEBHOOK_URL, expense);
    //alert('Submitted!');
  } catch (e) {
    console.error(e);
    alert('Failed to submit');
  }
}