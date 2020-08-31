// sections and panel
const incomeSection = document.querySelector('.income-area');
const expensesSection = document.querySelector('.expenses-area');
const availableMoney = document.querySelector('.available-money');
const addTransPanel = document.querySelector('.add-transaction-panel');

// inputs and select
const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');
const categorySelect = document.querySelector('#category');

// buttons 
const addTransBtn = document.querySelector('.add-transaction');
const saveBtn = document.querySelector('.save');
const deleteBtn = document.querySelector('.delete');
const cancelBtn = document.querySelector('.cancel');
const deleteAllBtn = document.querySelector('.delete-all');
const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');


let root = document.documentElement;
let $id = 0;
let $categoryIcon;
let $selectedCategory;
let $moneyArr = [0];



// functions for transaction panel

const clearInputs = () => {
    nameInput.value ='' 
    amountInput.value = '';
    categorySelect.selectedIndex = 0;
}

const showPanel = () => {
    addTransPanel.style.display = 'flex';
}

const closePanel = () => {
    addTransPanel.style.display = 'none';
    clearInputs();
}

const checkForm = () => {
    if(nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== 'none') {
        createNewTransaction();
    } else {

    }
}

const createNewTransaction = () => {
    
    let newTrans = document.createElement('div');
    newTrans.classList.add('transaction');
    newTrans.setAttribute('id', $id);

    checkCategory($selectedCategory);

    newTrans.innerHTML = `
    <p class="transaction-name">${$categoryIcon} ${nameInput.value}</p>
    <p class="transaction-amount">${amountInput.value} zł
    <button class="delete" onclick="deleteTrans(${$id})"><i class="fas fa-minus-circle"></i></button></p>`;

    amountInput.value > 0 ? incomeSection.appendChild(newTrans) && newTrans.classList.add('income') : expensesSection.appendChild(newTrans) && newTrans.classList.add('expense');

    $moneyArr.push(parseFloat(amountInput.value));
    countMoney($moneyArr);
    $id++;
    closePanel();
    clearInputs();
}

const selectCategory = () => {
    $selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
}


const checkCategory = transaction => {
    switch(transaction) {

        case '[+] Przychód':
            $categoryIcon = '<i class="far fa-money-bill-alt"></i>';
            break;
        case '[-] Zakupy':
            $categoryIcon = '<i class="fas fa-shopping-basket"></i>';
            break;
        case '[-] Jedzenie':
            $categoryIcon = '<i class="fas fa-utensils"></i>';
            break;
        case '[-] Kino':
            $categoryIcon = '<i class="fas fa-film"></i>';
            break;
    }
}

// functions for main panel

const countMoney = money => {

    let newMoney = money.reduce((x,y) => x + y);
    availableMoney.textContent = `${newMoney} zł`;
}


const deleteTrans = id => {
    
    let transactionToDelete = document.getElementById(id);
    let transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText);
    let indexTrans = $moneyArr.indexOf(transactionAmount);
    $moneyArr.splice(indexTrans,1);

    transactionToDelete.classList.contains('income') ? incomeSection.removeChild(transactionToDelete) : expensesSection.removeChild(transactionToDelete);

    countMoney($moneyArr);

}

const deleteAllTrans = () => {
    incomeSection.innerHTML = '<h3>Przychód:</h3>';
    expensesSection.innerHTML = '<h3>Wydatki:</h3>';
    availableMoney.textContent = '0zł';
    $moneyArr = [0];
}

const changeStyleLight = () => {
    root.style.setProperty('--first-color', '#F9F9F9');
    root.style.setProperty('--second-color', '#14161F');
    root.style.setProperty('--border-color', 'rgba(0,0,0,.25)');
}

const changeStyleDark = () => {
    root.style.setProperty('--first-color', '#14161F');
    root.style.setProperty('--second-color', '#F9F9F9');
    root.style.setProperty('--border-color', 'rgba(255, 255, 255,.45)');
}

addTransBtn.addEventListener('click', showPanel);
cancelBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', checkForm);
deleteAllBtn.addEventListener('click', deleteAllTrans);
lightBtn.addEventListener('click', changeStyleLight);
darkBtn.addEventListener('click', changeStyleDark);
