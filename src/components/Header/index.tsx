
import { Container, Content } from './styles'

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
    return (
        <Container>
            <Content>
                <button type="button" onClick={onOpenNewTransactionModal}>Adicionar</button>

                </Content>
        </Container>
    )
}