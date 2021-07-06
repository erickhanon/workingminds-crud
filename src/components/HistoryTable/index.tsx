import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function HistoryTable(){
    const { transactions, deleteTransaction } = useTransactions();

    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Estado</th>
                        <th>Cidade</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(transaction => (
                            <tr key={transaction.id}>
                            <td>{transaction.uf}</td>
                            <td>{transaction.cidade}</td>
                            <button onClick={async () => await deleteTransaction(transaction.id)}>deletar</button>
                            <button>editar</button>
                        </tr>    
                    ))}
                </tbody>
            </table>
        </Container>
    )
}