import { useState, useEffect } from 'react'
import Accordion from './components/Accordion'
import Pagination from './components/Pagination'
import ProgressBar from './components/ProgressBar'
import Tabs from './components/Tabs'
import Dropdown from './components/Dropdown'
import ToastDemo from './components/ToastDemo'
import { useToast } from './context/ToastContext'

const faqItems = [
  { title: 'Como faço um pedido?', content: 'Escolha o produto, clique em comprar e siga as etapas do carrinho.' },
  { title: 'Qual o prazo de entrega?', content: 'O prazo médio é de 5 a 10 dias úteis, dependendo da região.' },
  { title: 'Posso trocar um produto?', content: 'Sim, você tem até 7 dias após o recebimento para solicitar a troca.' },
]

const products = [
  'Notebook', 'Mouse', 'Teclado', 'Monitor',
  'Headset', 'Webcam', 'Impressora', 'Cadeira gamer',
  'Pendrive', 'HD externo', 'Roteador', 'Microfone',
]
const ITEMS_PER_PAGE = 4

const productTabs = [
  { title: 'Descrição', content: <p>Notebook leve e potente, ideal para estudos e trabalho.</p> },
  { title: 'Especificações', content: <p>Processador de 8 núcleos, 16 GB de RAM e SSD de 512 GB.</p> },
  { title: 'Avaliações', content: <p>Nota 4,8 de 5 com base em 120 avaliações de clientes.</p> },
]

function App() {
  const showToast = useToast()

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const visibleProducts = products.slice(start, start + ITEMS_PER_PAGE)

  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const [language, setLanguage] = useState('Português')

  function startUpload() {
    setProgress(0)
    setIsUploading(true)
  }

  useEffect(() => {
    if (!isUploading) return

    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(progress + 10)
      } else {
        setIsUploading(false)
        showToast('Upload concluído com sucesso!', 'success')
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [isUploading, progress, showToast])

  const languageOptions = ['Português', 'English', 'Español'].map((lang) => ({
    label: lang,
    onClick: () => {
      setLanguage(lang)
      showToast(`Idioma alterado para ${lang}`, 'info')
    },
  }))

  return (
    <>
      <header className="header">
        <h1>Atividade React</h1>
      </header>

      <main className="grid">
        <section className="card">
          <h2>Acordeão (FAQ)</h2>
          <Accordion items={faqItems} />
        </section>

        <section className="card">
          <h2>Paginação (Produtos)</h2>
          <ul>
            {visibleProducts.map((product) => (
              <li key={product}>{product}</li>
            ))}
          </ul>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </section>

        <section className="card">
          <h2>Barra de Progresso (Upload)</h2>
          <ProgressBar value={progress} label="Progresso do upload" />
          <button onClick={startUpload} disabled={isUploading}>
            {isUploading ? 'Enviando...' : 'Simular upload'}
          </button>
        </section>

        <section className="card">
          <h2>Abas (Detalhes do produto)</h2>
          <Tabs tabs={productTabs} />
        </section>

        <section className="card">
          <h2>Menu Suspenso (Idioma)</h2>
          <Dropdown label="Escolher idioma" options={languageOptions} />
          <p>Idioma selecionado: {language}</p>
        </section>

        <section className="card">
          <h2>Notificação Toast</h2>
          <ToastDemo />
        </section>
      </main>

      <footer className="footer">
        <p>Vinicius Sousa - Tópicos avançados em programação</p>
      </footer>
    </>
  )
}

export default App