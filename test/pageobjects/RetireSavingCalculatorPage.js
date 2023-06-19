class RetireSavingCalculatorPage {

    get currentAge() {
        return $('input[id=current-age]');
    }
    get invalidCurrentAgeError() {
        return $("//span[@id='invalid-current-age-error']");
    }
    get retirementAge() {
        return $("input[id=retirement-age]");
    }
    get invalidRetirementAgeError() {
        return $("//span[@id='invalid-retirement-age-error']");
    }
    get currentIncome() {
        return $("input[id=current-income]");
    }
    get invalidCurrentIncomeError() {
        return $("//span[@id='invalid-current-income-error']");
    }
    get spouseIncome() {
        return $("input[id=spouse-income]");
    }
    get currentTotalSavings() {
        return $("input[id=current-total-savings]");
    }
    get invalidCurrentTotalSavingError() {
        return $("//span[@id='invalid-current-total-savings-error']")
    }
    get currentAnnualSavingsPercentage() {
        return $("input[id=current-annual-savings]");
    }
    get invalidCurrentAnnualSavingError() {
        return $("//span[@id='invalid-current-annual-savings-error']");
    }
    get savingIncreaseRate() {
        return $("//input[@id='savings-increase-rate']");
    }
    get invalidSavingsIncreaseRateError() {
        return $("span[id='invalid-savings-increase-rate-error']");
    }
    get btnCalculate() {
        return $("//div/button[@data-tag-id ='submit']");
    }
    get radioBenefitYes() {
        return $("//div/fieldset/ul/li/input[@id ='yes-social-benefits']");
    }
    get radioBenefitNo() {
        return $("[type='radio'][value='N']");
    }
    get radioSingleStatus() {
        return $("[type='radio'][value='S']");
    }

    get radioMarriedStatus() {
        return $("yes-social-benefits");
    }
    get radioSSNOverride() {
        return $("social-security-override");
    }
    get resultmessage() {
        return $('#calculator-intro-section');
    }
    get resultCalculate() {
        return $('.container');
    }
    get incomeDefault() {
        return $("//div[@class='dsg-row-wrapper dsg-m-t-20']/fieldset/div[1]//input[@id='additional-income']");
    }
    get retirementDurationDefault() {
        return $("//div[@class='dsg-row-wrapper dsg-m-t-20']/fieldset/div[2]//input[@id='retirement-duration']");
    }
    get retirementAnnualIncome() {
        return $("//div[@class='dsg-row-wrapper dsg-m-t-20']/fieldset/div[5]//input[@id='retirement-annual-income']");
    }
    get preRetirementROIDefault() {
        return $("//div[@class='dsg-row-wrapper']//div[@id='pre-retirement-roi-container']/../input[@id='pre-retirement-roi']");
    } get postRetirementROIDefault() {
        return $("//div[@class='dsg-row-wrapper']//input[@id='post-retirement-roi']");
    }
    get saveChanges() {
        return $("//div[@class='dsg-row-wrapper']//button[contains(text(),'Save changes')]");
    }

    get defaultCalculatorMessageValues() {
        return $("//div[@class='dsg-alert-box-info']");
    }
    get radioButtonPostInflationYes() {
        return $("input[id='include-inflation']");
    }
    get expectedInflationRate() {
        return $("input[id='expected-inflation-rate']");
    }
    get labelIncludeInflation() {
        return $("//label[@for='include-inflation']");
    }
    get defaultValueLink() {
        return $("//a[@data-target='#default-values-modal']");
    }

    get labelBenefitYes() {
        return $("//label[@for='yes-social-benefits']");
    }

    get labelResult() {
        return $("//div[@id='calculator-results-container']");
    }
    get MaritalStatusList() {
        return $$("//input[@name='marital-status']");
    }
    get singleRadioButton() {
        return $('#single');
    }
    get marriedRadioButton() {
        return $('#married');
    }
    get yesSSNBenefit() {
        return $('#yes-social-benefits');
    }

    get labelSingle() {
        return $("//label[@for='single']");
    }
    get labelMarried() {
        return $("//label[@for='married']");
    }

    async SubmitDataWithRequiredFields(CAge, cRetirementAgre, CIncome, CTotalSaving, CAnuualSaving, SavingIncreaseRate) {

        //Enter data into various fields
        await this.EnterDataIntoCommonFields(CAge, cRetirementAgre, CIncome, CTotalSaving, CAnuualSaving, SavingIncreaseRate)

        if (this.ValidateSSNBenfitOptions(true)) {
            browser.pause(2000)
            await this.labelMarried.click()
        }
        else
            throw new Error('Error occurred');

        //Click on Calculate button
        await this.btnCalculate.click();

        await this.resultmessage.waitForDisplayed()
        //Verify if the for is submitted succesfully
        await expect(this.resultmessage).toHaveTextContaining('Pre-retirement calculator')

    }

    //Validate if SSN Benefits radio buttons are dispalyed as expected
    async ValidateSSNBenfitOptions(BenefitYes) {
        try {
            if (BenefitYes) {
                await this.labelBenefitYes.click()
                await this.singleRadioButton.waitForDisplayed()
                //When the SSN benefit is set to Yes, Single and Married radio buttons should be dispalyed
                if (this.singleRadioButton.isDisplayed() && this.marriedRadioButton.isDisplayed())
                    return true
            }
            else if (!(await this.singleRadioButton).isDisplayed() && !(await this.marriedRadioButton).isDisplayed())
                return true
            else
                return false
        } catch (ex) {
            return false
        }
    }

    async EnterDataIntoCommonFields(CAge, cRetirementAgre, CIncome, CTotalSaving, CAnuualSaving, SavingIncreaseRate) {
        //Click on Calculate to find out the required fields
        (await this.btnCalculate).click()

        //Enter Current age
        if (this.invalidCurrentAgeError.isDisplayed())
            await this.currentAge.setValue(CAge);

        //Enter retirement age
        if ((await this.invalidRetirementAgeError).isDisplayed())
            (await this.retirementAge).setValue(cRetirementAgre);

        //Enetr cirrent Income
        if ((await this.invalidCurrentIncomeError).isDisplayed()) {
            (await this.currentIncome).clearValue();
            (await this.currentIncome).click();
            (await this.currentIncome).setValue(CIncome);
        }
        //Enter current total savings
        if ((await this.invalidCurrentTotalSavingError).isDisplayed()) {
            (await this.currentTotalSavings).clearValue();
            (await this.currentTotalSavings).click();
            (await this.currentTotalSavings).setValue(CTotalSaving);
        }
        //Enter Current annual savings
        if ((await this.invalidCurrentAnnualSavingError).isDisplayed()) {
            (await this.currentAnnualSavingsPercentage).clearValue();
            (await this.currentAnnualSavingsPercentage).click();
            (await this.currentAnnualSavingsPercentage).setValue(CAnuualSaving);
        }

        //Enter savings increase rate
        if ((await this.invalidSavingsIncreaseRateError).isDisplayed()) {
            await this.savingIncreaseRate.waitForClickable()
            await this.savingIncreaseRate.clearValue();
            await this.savingIncreaseRate.click();
            await this.savingIncreaseRate.setValue("2");
        }

    }

   async ValidatePostRetirementFieldDisplay(RadioButtonYes, ExpectedInflation) {
        try {            
           await RadioButtonYes.waitForDisplayed();
            if (RadioButtonYes.isSelected() && ExpectedInflation.isDisplayed)
                return true
            else if (!RadioButtonYes.isSelected() && !ExpectedInflation.isDisplayed)
                return true
            else
                return false
        } catch (e) {
            return false
        }
    }

    async SubmitDataCompleteFields(CAge, cRetirementAgre, CIncome, CSpouseIncome, CTotalSaving, CAnuualSaving, SavingIncreaseRate,
        IncomeDefault, RetirementDurationDefault, RetirementAnnualIncome, PreRetirementROIDefault, PostRetirementROIDefault, ExpectedInflationRate) {

        await this.spouseIncome.setValue(CSpouseIncome)
        await this.EnterDataIntoCommonFields(CAge, cRetirementAgre, CIncome, CTotalSaving, CAnuualSaving, SavingIncreaseRate)

        ;(await this.defaultValueLink).waitForDisplayed(5000)
        await this.defaultValueLink.click()

        await this.incomeDefault.waitForClickable(1000)
        await this.incomeDefault.clearValue();
        await this.incomeDefault.click()
        await this.incomeDefault.setValue(IncomeDefault)


        await this.retirementDurationDefault.waitForClickable()
        await this.retirementDurationDefault.clearValue()
        await this.retirementDurationDefault.click()
        await this.retirementDurationDefault.setValue(RetirementDurationDefault)

        await this.labelIncludeInflation.waitForClickable(1000)
        await this.labelIncludeInflation.click();

        if (this.ValidatePostRetirementFieldDisplay(this.radioButtonPostInflationYes, this.expectedInflationRate)) {
            await this.expectedInflationRate.waitForClickable(1000)
            await this.expectedInflationRate.clearValue()
            await this.expectedInflationRate.click()
            await this.expectedInflationRate.setValue(ExpectedInflationRate)
        }
        else {
            throw new Error('Error occurred');
        }
        await this.retirementAnnualIncome.waitForClickable()
        await this.retirementAnnualIncome.clearValue()
        await this.retirementAnnualIncome.click()
        await this.retirementAnnualIncome.setValue(RetirementAnnualIncome);

        await this.preRetirementROIDefault.waitForClickable()
        await this.preRetirementROIDefault.clearValue()
        await this.preRetirementROIDefault.click()
        await this.preRetirementROIDefault.setValue(PreRetirementROIDefault);


        await this.postRetirementROIDefault.clearValue()
        await this.postRetirementROIDefault.click()
        await this.postRetirementROIDefault.setValue(PostRetirementROIDefault);

        await this.saveChanges.click();
        (await this.defaultCalculatorMessageValues).waitForDisplayed()
        await expect(this.defaultCalculatorMessageValues).toHaveTextContaining('Default calculator values')

        await this.btnCalculate.click();
        await this.labelResult.waitForDisplayed()

        //Verify if the for is submitted succesfully
        await expect(this.resultmessage).toHaveTextContaining('Pre-retirement calculator')
    }
}
export default new RetireSavingCalculatorPage();