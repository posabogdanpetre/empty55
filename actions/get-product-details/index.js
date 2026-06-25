// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'PNC Cash Rewards Visa Credit Card',
        description: 'Earn a $200 bonus after qualifying purchases plus 4% cash back on gas, 3% on dining, and 2% on groceries.',
        image_url: 'https://www.pnc.com/en/personal-banking/banking/credit-cards/_jcr_content/main/pageBody/containergrid_copy_c_283020490/embeddedGrid/containergrid_copy_c_215278159/embeddedGrid/containergrid/embeddedGrid/image.coreimg.png/1778094519173/creditcard-cash-rewards-200-bonus-ribbon.png',
        price: '$0 Annual Fee',
        category: 'Credit Card'
    },
    {
        name: 'PNC Spend Wise Visa Credit Card',
        description: 'Unlock a lower purchase APR over time with a 0% introductory APR on purchases and balance transfers for the first 18 months.',
        image_url: 'https://www.pnc.com/en/personal-banking/banking/credit-cards/_jcr_content/main/pageBody/containergrid_1061138187/embeddedGrid/containergrid_copy_c/embeddedGrid/image.coreimg.png/1730324023559/creditcard-spend-wise.png',
        price: '$0 Annual Fee',
        category: 'Credit Card'
    },
    {
        name: 'PNC Secured Visa Credit Card',
        description: 'Start, build, and strengthen your credit by setting your own credit limit with a refundable security deposit.',
        image_url: 'https://www.pnc.com/en/personal-banking/banking/credit-cards/_jcr_content/main/pageBody/containergrid/embeddedGrid/containergrid_copy_c/embeddedGrid/containergrid_121507/embeddedGrid/image_copy.coreimg.png/1769797267110/creditcard-secured.png',
        category: 'Credit Card'
    }
]

module.exports = async ({ name = '' }) => {
    if (!name || typeof name !== 'string' || !name.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a product name to retrieve details for.' }]
        }
    }

    const query = name.trim().toLowerCase()
    const item = MOCK_DATA.find((p) => p.name.toLowerCase() === query)
        || MOCK_DATA.find((p) => p.name.toLowerCase().includes(query))

    if (!item) {
        // Not found — return content only (no structuredContent) so the widget shows its empty state.
        return {
            content: [{ type: 'text', text: `No product found matching: ${name}` }]
        }
    }

    const parts = [item.name]
    if (item.category) parts.push(item.category)
    if (item.price) parts.push(item.price)
    const summary = `${parts.join(' — ')}${item.description ? `. ${item.description}` : ''}`

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
        structuredContent: { ...item }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(name)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
