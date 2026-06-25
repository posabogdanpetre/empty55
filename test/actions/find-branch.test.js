const handler = require('../../actions/find-branch/index.js')

describe('find_branch handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ zip_code: '15222' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Find a PNC branch near me" returns branch locations', async () => {
        const out = await handler({ zip_code: '15222' })
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.branches.length).toBeGreaterThan(0)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ zip_code: '15222' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('each branch has the expected fields', async () => {
        const out = await handler({ zip_code: 'Pittsburgh' })
        out.structuredContent.branches.forEach((b) => {
            expect(b).toHaveProperty('name')
            expect(b).toHaveProperty('address')
            expect(b).toHaveProperty('phone')
            expect(b).toHaveProperty('hours')
        })
    })

    test('returns error message when zip_code is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/zip_code|provide/i)
        expect(out.structuredContent.branches).toEqual([])
    })

    test('returns error message when zip_code is blank', async () => {
        const out = await handler({ zip_code: '   ' })
        expect(out.content[0].text).toMatch(/zip_code|provide/i)
        expect(out.structuredContent.branches).toEqual([])
    })
})
