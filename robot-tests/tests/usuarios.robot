*** Settings ***
Library    SeleniumLibrary

*** Test Cases ***

Login de Usuário EcoMarket
    Abrir a página do EcoMarket
    Inserir nome de usuário ou email
    Inserir senha válida
    Clicar no botão entrar
    Fechar Navegador

Criar usuário
    Abrir a página do EcoMarket
    Clicar no botão de registro
    Inserir nome de usuário
    Inserir email
    Inserir CPF
    Inserir senha nova válida
    Inserir a senha novamente para confirmação
    Clicar no botão criar conta
    Fechar Navegador

Editar usuário
    Abrir a página do EcoMarket
    Inserir nome de usuário ou email
    Inserir senha válida
    Clicar no botão entrar
    Clicar no botão de perfil
    Clicar no botão de editar perfil
    Inserir nome de usuário na aba de perfil
    Inserir email na aba de perfil
    Inserir CPF na aba de perfil 
    Inserir senha nova válida na aba de perfil
    Clicar no botão salvar alterações
    Fechar Navegador

Alterar função de usuário como administrador
    Abrir a página do EcoMarket
    Inserir nome de usuário ou email
    Inserir senha válida
    Clicar no botão entrar
    Clicar no botão dashboard
    Clicar no botão gerenciar usuários
    Clicar no ícone de lápis para editar o usuário
    Clicar no dropdown de função
    Clicar na função de vendedor
    Fechar Navegador

Excluir usuário
    Abrir a página do EcoMarket
    Inserir nome de usuário ou email
    Inserir senha válida
    Clicar no botão entrar
    Clicar no botão dashboard
    Clicar no botão gerenciar usuários
    Clicar no ícone de lixeira
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

    Sleep    1s

Clicar no botão dashboard
    Click Button    //button[@class='MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textInherit MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorInherit MuiButton-root MuiButton-text MuiButton-textInherit MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorInherit css-plnrbk-MuiButtonBase-root-MuiButton-root'][contains(.,'Dashboard')]

    Sleep    1s

Clicar no botão gerenciar usuários
    Click Button    //button[@class='MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeSmall MuiButton-outlinedSizeSmall MuiButton-colorPrimary MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeSmall MuiButton-outlinedSizeSmall MuiButton-colorPrimary css-1qh9735-MuiButtonBase-root-MuiButton-root'][contains(.,'Gerenciar Usuários')]

    Sleep    1s

Clicar no ícone de lixeira
    Click Element    css=[data-testid="delete-button-testedelete"]
    Sleep     1s

Clicar na modal de confirmação
    Click Button    //button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary css-hpzj3n-MuiButtonBase-root-MuiButton-root'][contains(.,'Excluir')]

Clicar no botão de registro
    Click Element    //a[@class='MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways css-ohipl2-MuiTypography-root-MuiLink-root'][contains(.,'Crie uma conta')]

Inserir nome de usuário
    Input Text     //input[contains(@id,'«r1»')]    testedelete

Inserir email
    Input Text    //input[contains(@type,'email')]    testedelete@teste.com

Inserir CPF
    Input Text    //input[contains(@id,'«r3»')]    44179045028

Inserir senha nova válida
    Input Text    css=[data-testid="input-senha"]             minhaSenha123

Inserir a senha novamente para confirmação
    Input Text    css=[data-testid="input-confirmar-senha"]   minhaSenha123

Clicar no botão criar conta
    Click Button    //button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-disableElevation MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-disableElevation MuiButton-fullWidth css-fgncbu-MuiButtonBase-root-MuiButton-root'][contains(.,'Criar Conta')]

Fechar Navegador
    Close Browser

Clicar no botão de perfil
    Click Button    //button[contains(@class,'MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit MuiIconButton-edgeEnd MuiIconButton-sizeLarge css-q9qvak-MuiButtonBase-root-MuiIconButton-root')]

Clicar no botão de editar perfil
    Click Element    xpath=//li[contains(., 'Perfil')]

Clicar no botão salvar alterações
    Click Button    //button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-disableElevation MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-disableElevation MuiButton-fullWidth css-fgncbu-MuiButtonBase-root-MuiButton-root'][contains(.,'Salvar Alterações')]

Inserir nome de usuário na aba de perfil
    Input Text    //input[contains(@value,'teste123')]    teste123

Inserir email na aba de perfil
    Input Text    //input[contains(@type,'email')]   teste@teste.com

Inserir CPF na aba de perfil
    Input Text    //input[contains(@value,'606.826.041-00')]    60682604100

Inserir senha nova válida na aba de perfil
    Input Text    //input[contains(@aria-describedby,'«ro»-helper-text')]    teste123

Clicar no ícone de lápis para editar o usuário
    Click Element    css=[data-testid="role-edit-button-testedelete"]
    Sleep    1s

Clicar no dropdown de função
    Click Element    (//span[@class='MuiChip-label MuiChip-labelSmall css-eccknh-MuiChip-label'])[3]

Clicar na função de vendedor
    Click Element    //span[@class='MuiChip-label MuiChip-labelSmall css-eccknh-MuiChip-label'][contains(.,'Vendedor')]