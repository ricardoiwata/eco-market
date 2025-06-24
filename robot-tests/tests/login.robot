*** Settings ***
Library    SeleniumLibrary

*** Test Cases ***
Login de Usuário EcoMarket
    Abrir a página do EcoMarket
    Inserir nome de usuário ou email
    Inserir senha válida
    Clicar no botão entrar
    Fechar Navegador


*** Keywords ***
Abrir a página do EcoMarket
    Open Browser    localhost:3000/login    firefox

Inserir nome de usuário ou email
    Input Text    //input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedStart css-2u11ia-MuiInputBase-input-MuiOutlinedInput-input')]     teste123

Inserir senha válida
    Input Password    //input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedStart MuiInputBase-inputAdornedEnd css-qve9l1-MuiInputBase-input-MuiOutlinedInput-input')]    teste123

Clicar no botão entrar
    Click Button    //button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-disableElevation MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-disableElevation MuiButton-fullWidth css-fgncbu-MuiButtonBase-root-MuiButton-root'][contains(.,'Entrar')]

Fechar Navegador
    Close Browser
