const {Builder, By, Key, until} = require("selenium-webdriver");
const fs = require("fs");

(async function example() {
    const driver = await new Builder().forBrowser("chrome").build();
    try {
        const start = Date.now();
        await driver.get("http://localhost:8080?test=1");

        fs.writeFileSync(
            "button_1.png",
            await driver.takeScreenshot(),
            "base64",
        );

        const element = await driver.findElement(By.css("button"));
        await driver
            .actions()
            .mouseMove(element, {x: 10, y: 10})
            .perform();

        fs.writeFileSync(
            "button_2.png",
            await driver.takeScreenshot(),
            "base64",
        );

        await driver
            .actions()
            .mouseDown(element, {x: 10, y: 10})
            .perform();

        fs.writeFileSync(
            "button_3.png",
            await driver.takeScreenshot(),
            "base64",
        );

        const body = await driver.findElement(By.css("body"));

        await driver
            .actions()
            .mouseMove(body, {x: 1, y: 11})
            .mouseUp()
            .perform();
        await driver
            .actions()
            .sendKeys(Key.TAB)
            .perform();

        fs.writeFileSync(
            "button_4.png",
            await driver.takeScreenshot(),
            "base64",
        );

        await driver.get("http://localhost:8080?test=2");
        fs.writeFileSync(
            "button_5.png",
            await driver.takeScreenshot(),
            "base64",
        );

        await driver.get("http://localhost:8080?test=3");
        fs.writeFileSync(
            "button_6.png",
            await driver.takeScreenshot(),
            "base64",
        );

        await driver.get("http://localhost:8080?test=4");
        fs.writeFileSync(
            "modal_1.png",
            await driver.takeScreenshot(),
            "base64",
        );

        const launcher = await driver.findElement(By.css("button"));
        await driver
            .actions()
            .mouseMove(launcher, {x: 10, y: 10})
            .mouseDown()
            .mouseUp()
            .perform();

        fs.writeFileSync(
            "modal_2.png",
            await driver.takeScreenshot(),
            "base64",
        );

        await driver
            .actions()
            .sendKeys(Key.TAB)
            .perform();
        fs.writeFileSync(
            "modal_3.png",
            await driver.takeScreenshot(),
            "base64",
        );

        await driver
            .actions()
            .sendKeys(Key.TAB)
            .perform();
        fs.writeFileSync(
            "modal_4.png",
            await driver.takeScreenshot(),
            "base64",
        );

        const closeButton = await driver.findElement(
            By.css('[data-test-id="close-modal"]'),
        );
        await driver
            .actions()
            .mouseMove(closeButton, {x: 10, y: 10})
            .mouseDown()
            .mouseUp()
            .perform();

        fs.writeFileSync(
            "modal_5.png",
            await driver.takeScreenshot(),
            "base64",
        );

        const elapsed = Date.now() - start;
        console.log(`test duration = ${elapsed}`);
    } catch (e) {
        console.log(e);
    } finally {
        await driver.quit();
    }
})();
