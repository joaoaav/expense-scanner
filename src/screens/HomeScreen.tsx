import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

type Expense = {
  id: string;
  date: string;
  amount: number;
  description: string;
  paidBy: 'rafael' | 'joao';
  split: boolean;
};

const dummyExpenses: Expense[] = [
  {
    id: '1',
    date: '2025-05-28',
    amount: 42.5,
    description: 'Groceries at Supermarket',
    paidBy: 'rafael',
    split: true,
  },
  {
    id: '2',
    date: '2025-05-27',
    amount: 100,
    description: 'Dinner',
    paidBy: 'joao',
    split: false,
  },
];

const HomeScreen: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(dummyExpenses);
  const router = useRouter();

  // TODO: Load real expenses from Google Sheets or local storage

  const renderItem = ({ item }: { item: Expense }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.description}>{item.description}</Text>
      <Text>{item.date}</Text>
      <Text>
        Paid by: <Text style={{ fontWeight: 'bold' }}>{item.paidBy}</Text>
      </Text>
      <Text>Amount: ${item.amount.toFixed(2)}</Text>
      <Text>Split: {item.split ? 'Yes' : 'No'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses</Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No expenses yet.</Text>}
      />

      <View style={styles.buttons}>
        <Button title="Scan Receipt" onPress={() => router.push('/scan')} />
        <Button title="Login" onPress={() => router.push('/login')} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  expenseItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  description: { fontWeight: 'bold', fontSize: 16 },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});