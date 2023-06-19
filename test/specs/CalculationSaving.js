import CalculatePage from '../pageobjects/RetireSavingCalculatorPage.js'
import TestData from '../TestData/CalculateRetirementTestData.json' assert {type: 'json'};


describe('Submit data with required fields', async () => {
    it('Submit Retirement Saving Calculation with Required Fields', async function(){
      //Submit Data with required fields
      await browser.url(TestData.URL.url) 
      await CalculatePage.SubmitDataWithRequiredFields(TestData.person.CAge,TestData.person.CRetirementAge, TestData.person.CIncome
       ,TestData.person.CTotalSaving, TestData.person.CAnuualSaving, TestData.person.SavingIncreaseRate)  

    })  

    it('Submit Complete Retirement Saving Calculation data using Default Values', async function(){
      //Submit complete form Data 
       await browser.url(TestData.URL.url)
       await CalculatePage.SubmitDataCompleteFields(TestData.person.CAge, TestData.person.CRetirementAge,
       TestData.person.CIncome,TestData.person.CSpouseIncome,TestData.person.CTotalSaving,
       TestData.person.CAnuualSaving, TestData.person.SavingIncreaseRate,
       TestData.person.DefaultRetirementIncome, TestData.person.DefaultYearsPlanOnRetirementNeedToLast,
       TestData.person.DefaultPercentFinalYearIncome,TestData.person.PreRefinementInvestmentReturn,
       TestData.person.PostRefinementInvestmentReturn, TestData.person.ExpectedInflationRate)      

    })    
})