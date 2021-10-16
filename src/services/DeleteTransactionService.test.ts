import * as DeleteTransactionService from "./DeleteTransactionService"
// @ponicode
describe("execute", () => {
    let inst: any

    beforeEach(() => {
        inst = new DeleteTransactionService.default()
    })

    test("0", async () => {
        await inst.execute("payment")
    })

    test("1", async () => {
        await inst.execute("withdrawal")
    })

    test("2", async () => {
        await inst.execute("invoice")
    })

    test("3", async () => {
        await inst.execute("deposit")
    })

    test("4", async () => {
        await inst.execute("")
    })
})
