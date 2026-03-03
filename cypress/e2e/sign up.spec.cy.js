///<reference types = "cypress" />

describe('account creation', () => {
     beforeEach( () => {
      cy.visit('https://tutorialsninja.com/demo');
      cy.get ('.caret') .click();
    cy.contains('Register').should('be.visible')
     .click ();
     }); 
  it.only ('create account by entering all mandatory fields',()=>{
  
    cy.get ('#input-firstname') .type ('bolau');
    cy.get ('#input-lastname') .type ('doerp');
    cy.get ('#input-email') .type ('tperov86850@lhory.com');
    cy.get ('#input-telephone') .type ('08012345670');
    cy.get ('#input-password') .type ('Johndoe@182');
    cy.get ('#input-confirm') .type ('Johndoe@182');
    cy.get ("input[value='1'][name='newsletter']") .click();
    cy.get ("input[value='1'][name='agree']") .check();
    cy.get("input[value='Continue']") . click();
    cy.get("div[id='content'] h1") .should ('contain.text','Your Account Has Been Created!');  


  });


  // invalid test case : leave  fields empty

  it('validation error when some fields are left empty', () =>{
    
    cy.get("input[value='Continue']").click()
    cy.get('#account-register .text-danger')
    .should('contain.text', 'First Name must be between 1 and 32 characters!');
    cy.get('#account-register  .text-danger') 
    .should ('contain.text', 'Last Name must be between 1 and 32 characters!');
    cy.get('#account-register  .text-danger')
    .should ('contain.text', 'E-Mail Address does not appear to be valid!');
    cy.get ('#account-register .text-danger')
    .should ('contain.text','Telephone must be between 3 and 32 characters!')
    cy.get ('#account-register  .text-danger')
    .should ('contain.text', 'Password must be between 4 and 20 characters!');
    cy.get('.alert.alert-danger.alert-dismissible')
    .should('contain.text','Warning: You must agree to the Privacy Policy!');
     
  
  });

  // empty field validation using LOOP METHOD

  it('empty field validation', () =>{
    cy.get("input[value='Continue']").click();
    const expectedErrors =[
      'First Name must be between 1 and 32 characters!',
      'Last Name must be between 1 and 32 characters!',
      'E-Mail Address does not appear to be valid! ',
      'Telephone must be between 3 and 32 characters!',
      'Password must be between 4 and 20 characters!',
    ];
     expectedErrors .forEach((text) => {
      cy.get('#account-register,.text-danger')
      .should('contain.text',text);
    });
    cy.get('.alert-danger')
    .should ('contain.text','Warning: You must agree to the Privacy Policy!');

 
  });

// password  and password confirmation mismatch

it('password mismatch error handling', () =>{
    cy.get( '#input-firstname') .type ('jamy');
    cy.get ('#input-lastname') .type ('borr');
    cy.get('#input-email').type('suprutruddewe-4866@yopmail.com');
    cy.get('#input-telephone') .type('08134567809');
    cy.get('#input-password') .type('Jamy@123');
    cy.get('#input-confirm') .type('Wrong@123');
    cy.get("input[value='0']") .click();
    cy.get("input[value='1'][name='agree']") .check();
    cy.get ("input[value='Continue']") .click();
    cy.get('#account-register  .text-danger')
    .should('contain.text', 'Password confirmation does not match password!');



});

// duplicate E-mail
it('should not allow account registration with an existing email',()=>{
  const usedEmail = 'perov86850@lhory.com';
  cy.get('#input-firstname') .type ('Ade');
  cy.get ('#input-lastname').type ('Bola');
  cy.get('#input-email').type('perov86850@lhory.com');
    cy.get('#input-telephone') .type('08134567809');
    cy.get('#input-password') .type('Johndoe@182');
    cy.get('#input-confirm') .type('Johndoe@182');
    cy.get("input[value='0']") .click();
    cy.get("input[value='1'][name='agree']") .check();
    cy.get ("input[value='Continue']") .click();
    cy.get('.alert-danger')
    .should('contain.text', 'E-Mail Address is already registered!');


});


// Login Validation

describe('Login test',()=>{
beforeEach(()=>{
cy.visit('https://tutorialsninja.com/demo');
cy.get('.caret').click();
cy.contains('Login')
.should('be.visible')
.click();
});
it('login with valid credentials',()=>{

  cy.get ('#input-email') .type('pucado1990@gmail.com');
  cy.get('#input-password').type('Solo@123')
  cy.get ("input[value='Login']") .click ();
  cy.get('h2')
  .should('contain.text','My Account');

  

});

// Invalid Login validation
it('error message should be seen for invalid login input',()=>{
  cy.get ('#input-email') .type('pucado1990@gmail.com');
  cy.get('#input-password').type('solo@123');
  cy.get ("input[value='Login']") .click ();
  cy.get('.alert-danger')
  .should('be.visible') 
  .and('contain.text','Warning: No match for E-Mail Address and/or Password');
  
});

it('add iMac to cart',()=>{
  cy.get('ul.nav >li.dropdown')
  .contains('Desktops')
  .trigger('mouseover');
  cy.wait(600);
  cy.contains('.dropdown-menu li a','Mac (1)').click({force : true});
  cy.get('.product-thumb').contains('iMac').parents('.product-thumb')
  .find('button[onclick*="cart.add"]').click();
  cy.get('.alert.alert-success.alert-dismissible')
  .should('be.visible')
  .and('contain.text','Success: You have added iMac to your shopping cart!');
  
  


});


});
