const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ name: 'PNC Cash Rewards Visa Credit Card' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Tell me more about the PNC Cash Rewards Visa" returns product details', async () => {
        const out = await handler({ name: 'PNC Cash Rewards Visa Credit Card' })
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.content[0].text).toMatch(/Cash Rewards/i)
        expect(out.structuredContent).toBeTruthy()
        expect(out.structuredContent.name).toBe('PNC Cash Rewards Visa Credit Card')
    })

    test('structuredContent is a flat plain object, not a bare array', async () => {
        const out = await handler({ name: 'PNC Cash Rewards Visa Credit Card' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(out.structuredContent).toHaveProperty('price')
        expect(out.structuredContent).toHaveProperty('category')
    })

    test('matches by partial name', async () => {
        const out = await handler({ name: 'Spend Wise' })
        expect(out.structuredContent.name).toBe('PNC Spend Wise Visa Credit Card')
    })

    test('returns error message when name is missing', async () => {
        const out = await handler({})
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0].text).toMatch(/name|provide/i)
        expect(out.structuredContent).toBeUndefined()
    })

    test('unknown product returns not-found message and no structuredContent', async () => {
        const out = await handler({ name: 'Nonexistent Mortgage Plan' })
        expect(out.content[0].text).toMatch(/no product found|not found/i)
        expect(out.structuredContent).toBeUndefined()
    })
})
