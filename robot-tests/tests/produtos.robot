*** Settings ***
Library    SeleniumLibrary

*** Test Cases ***
Cadastro de produto
    Abrir a página do EcoMarket
    Inserir nome de usuário ou email
    Inserir senha válida
    Clicar no botão entrar
    Clicar no botão gerenciar produtos
    Clicar no botão adicionar produtos
    Inserir o nome do produto
    Inserir a descrição do produto
    Inserir o preço do produto
    Inserir o estado do produto
    Inserir a categoria do produto
    Inserir o telefone do vendedor
    Inserir a url da imagem
    Clicar no botão adicionar produto
    Fechar Navegador

Editar produto
    Abrir a página do EcoMarket
    Inserir nome de usuário ou email
    Inserir senha válida
    Clicar no botão entrar
    Clicar no botão gerenciar produtos
    Clicar no ícone de lápis para editar o produto
    Inserir o nome do produto
    Inserir a descrição do produto
    Inserir o preço do produto
    Inserir o estado do produto
    Inserir a categoria do produto
    Inserir o telefone do vendedor
    Inserir a url da imagem
    Clicar no botão salvar alterações
    Fechar Navegador

Exclusão de produto
    Abrir a página do EcoMarket
    Inserir nome de usuário ou email
    Inserir senha válida
    Clicar no botão entrar
    Clicar no botão gerenciar produtos
    Clicar no ícone de lixeira para deletar o produto
    Confirmar a exclusão do produto
    Fechar Navegador

Visualizar Produto
    Abrir a página do EcoMarket
    Inserir nome de usuário ou email
    Inserir senha válida
    Clicar no botão entrar
    Clicar no botão ver detalhes
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
    
    Sleep     1s

 Clicar no botão gerenciar produtos
     Click Button    //button[@class='MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textInherit MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorInherit MuiButton-root MuiButton-text MuiButton-textInherit MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorInherit css-plnrbk-MuiButtonBase-root-MuiButton-root'][contains(.,'Gerenciar Produtos')]
     Sleep    1s

Clicar no botão adicionar produtos
    Click Button    //button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary css-1t9maor-MuiButtonBase-root-MuiButton-root'][contains(.,'Adicionar Produto')]
    Sleep    1s

Inserir o nome do produto
    Input Text    //input[contains(@placeholder,'Nome do produto')]    Produto Teste Robot
    Sleep    1s

Inserir a descrição do produto
    Input Text    //textarea[contains(@rows,'4')]    Produto teste usando robot
    Sleep    1s

Inserir o preço do produto
    Input Text    //input[contains(@placeholder,'0,00')]    99
    Sleep    1s

Inserir o estado do produto
    Click Element    xpath=//div[@role="combobox" and @aria-labelledby]
    Wait Until Element Is Visible    xpath=//li[contains(text(), "São Paulo")]    2s
    Click Element    xpath=//li[contains(text(), "São Paulo")]
    Sleep    1s

Inserir a categoria do produto
    Wait Until Element Is Visible    xpath=//label[contains(., "Categoria")]/following::div[@role="combobox"][1]
    Click Element                    xpath=//label[contains(., "Categoria")]/following::div[@role="combobox"][1]
    Wait Until Element Is Visible    xpath=//ul[@role="listbox"]
    Click Element                    xpath=//ul[@role="listbox"]//li[normalize-space(.)="Moda Sustentável"]
    Sleep    1s

Inserir o telefone do vendedor
    Input Text    //input[contains(@placeholder,'(XX) XXXXX-XXXX')]    11999999999
    Sleep    1s

Inserir a url da imagem
    Input Text    css=[data-testid="input-url"]    urlteste

Clicar no botão adicionar produto
    Sleep     1s
    Click Button    //button[@type='submit']

Clicar no ícone de lixeira para deletar o produto
    Click Element    css=[data-testid="delete-button-Produto Teste Robot"]
    Sleep    1s

Clicar no ícone de lápis para editar o produto
    Click Element    css=[data-testid="edit-button-Produto Teste Robot"]
    Sleep    1s

Clicar no botão salvar alterações
    Click Button    //button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary css-1my2kr7-MuiButtonBase-root-MuiButton-root'][contains(.,'Atualizar Produto')]
    Sleep    1s

Confirmar a exclusão do produto
    Click Button    //button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary css-hpzj3n-MuiButtonBase-root-MuiButton-root'][contains(.,'Excluir')]
    Sleep    1s

Clicar no botão ver detalhes
    Click Button    //button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-fullWidth css-12k55ub-MuiButtonBase-root-MuiButton-root'][contains(.,'Ver Detalhes')]

Fechar Navegador
    Close Browser