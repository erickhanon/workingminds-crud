import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
    id: number;
    uf: string;
    cidade: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
    deleteTransaction: (id: number) => Promise<void>;
}

const TransactionContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput){
        const response = await api.post('/transactions', {
            ...transactionInput,
        })

        console.log(response);
        

        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction, //new data
        ]);
    }

    async function deleteTransaction(id: number) {
        await api.delete(`/transactions/${id}`)

        setTransactions(transactions.filter(transaction => {
            return transaction.id !== id
        }));
    }

    return(
        <TransactionContext.Provider value={{ transactions, createTransaction, deleteTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionContext);
    return context;
}