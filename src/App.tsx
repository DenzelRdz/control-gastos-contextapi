import BudgetForm from './components/BudgetForm'
import BudgetTracker from './components/BudgetTracker'
import ExpenseList from './components/ExpenseList'
import ExpenseModal from './components/ExpenseModal'
import FilterByCategory from './components/FilterByCategory'
import { useBudget } from './hooks/useBudget'
import { useEffect, useMemo } from 'react'

function App() {
   const { state } = useBudget()
   const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

   useEffect(() => {
      localStorage.setItem('budget', state.budget.toString())
      localStorage.setItem('expenses', JSON.stringify(state.expenses))
   }, [state])

   return (
      <>
         <header className="bg-blue-600 py-8 max-h-72">
            <h1 className="uppercase text-center font-black text-4xl text-white">Planificador de Gastos</h1>
         </header>
         <div className="max-w-3xl mx-auto shadow-lg bg-white rounded-lg mt-10 p-10">
            {isValidBudget ? <BudgetTracker/> : <BudgetForm/>}
         </div>

         {isValidBudget && (
            <main className='max-w-3xl mx-auto py-10'>
               <FilterByCategory/>
               <ExpenseList/>
               <ExpenseModal/>
            </main>
         )}

      </>
   )
}

export default App