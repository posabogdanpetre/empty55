const handler = require('../../actions/list-banking-products/index.js')

describe('list_banking_products handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({})
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Show me some banking products" returns products on happy path', async () => {
        const out = await handler({})
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.products.length).toBeGreaterThan(0)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({})
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(Array.isArray(out.structuredContent.products)).toBe(true)
    })

    test('filters by category', async () => {
        const out = await handler({ category: 'Credit Card' })
        const products = out.structuredContent.products
        expect(products.length).toBeGreaterThan(0)
        expect(products.every((p) => p.category === 'Credit Card')).toBe(true)
    })

    test('returns no results for a category with no matching products', async () => {
        const out = await handler({ category: 'Mortgage' })
        expect(out.structuredContent.products).toHaveLength(0)
        expect(out.content[0].text).toMatch(/no banking products/i)
    })
})
