import { useToast } from '../context/ToastContext'

function ToastDemo() {
  const showToast = useToast()

  return (
    <div>
      <button onClick={() => showToast('Operação realizada com sucesso!', 'success')}>Sucesso</button>
      <button onClick={() => showToast('Erro ao salvar os dados.', 'error')}>Erro</button>
      <button onClick={() => showToast('Você tem uma nova mensagem.', 'info')}>Informação</button>
    </div>
  )
}

export default ToastDemo