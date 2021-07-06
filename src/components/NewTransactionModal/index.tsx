import { FormEvent, useState, useEffect } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import { Container } from './styles';
import { useTransactions } from '../../hooks/useTransactions';
import statesData from '../../assets/data/states';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    initialState?: string,
    initialCity?: string,
}

export function NewTransactionModal({ isOpen, onRequestClose, initialState = 'SP', initialCity = '' }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();

    const [selectedState, setSelectedState] = useState(initialState);
    const [selectedCity, setSelectedCity] = useState(initialCity);

    const cities = statesData.estados.find(estado => {
        return estado.sigla === selectedState
    })?.cidades || []

    useEffect(() => {
        setSelectedCity(cities[0])
    }, [cities])

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            cidade: selectedCity,
            uf: selectedState,
        });

        setSelectedState('');
        setSelectedCity('');
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
            type="button" 
            onClick={onRequestClose} 
            className="react-close-modal">
            <img src={closeImg} alt="fechar" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar</h2>
                <select
                    id='estado'
                    value={selectedState}
                    placeholder="Estado"
                    onChange={event => setSelectedState(event.target.value)}>
                        {statesData.estados.map((state) => (
                            <option value={state.sigla}>{state.sigla}</option>
                        ))}
                </select>

                <select
                    id="cidade"
                    placeholder="Cidade"
                    onChange={event => setSelectedCity(event.target.value)}>
                        {cities.map((city) => (
                            <option value={city}>{city}</option>
                        ))}
                    </select>
            <button type="submit">Confirmar</button>
            </Container>
        </Modal> 
    );
}