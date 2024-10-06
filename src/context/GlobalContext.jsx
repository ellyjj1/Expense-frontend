import { useState, createContext} from "react";

export const GlobalContext = createContext(null);


export default function GlobalState({ children }) {
    const [formData, setformData] = useState({
        type: "expense",
        amount: 0,
        description: ""
    });

    const [value, setvalue] = useState("expense");
    const [totalExpense, settotalExpense] = useState(0);
    const [totalIncome, settotalIncome] = useState(0);
    const [allTransactions, setallTransactions] = useState([]);

    // Azure环境
    // const baseURL = "https://expense-backend-ggc9a0gsgdd3c4a7.canadacentral-01.azurewebsites.net/";

    // Vercel环境
    // const baseURL = "https://expense-tracker-backend-navy.vercel.app/";

    const baseURL = "http://127.0.0.1:8000/";
    // const baseURL_Auth = "http://127.0.0.1:8000/";






    function handleFormSubmit(currentFormData) {
        if (!currentFormData.description || !currentFormData.amount) return;
        setallTransactions([...allTransactions, { ...currentFormData, id: Date.now() }]);
    }


    return (
        <GlobalContext.Provider
            value={{
                formData,
                setformData,
                value,
                setvalue,
                totalExpense,
                settotalExpense,
                totalIncome,
                settotalIncome,
                allTransactions,
                setallTransactions,
                handleFormSubmit,
                baseURL,
            }}>
            {children}
        </GlobalContext.Provider>
    );
}
