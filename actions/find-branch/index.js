// synthetic fixture — no sample data available from Action Planner
// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'PNC Bank - Market Square',
        address: '300 Fifth Ave, Pittsburgh, PA 15222',
        phone: '(412) 555-0182',
        hours: 'Mon-Fri 9:00 AM - 5:00 PM'
    },
    {
        name: 'PNC Bank - Shadyside',
        address: '5500 Walnut St, Pittsburgh, PA 15232',
        phone: '(412) 555-0147',
        hours: 'Mon-Fri 9:00 AM - 6:00 PM, Sat 9:00 AM - 1:00 PM'
    },
    {
        name: 'PNC Bank ATM - Strip District',
        address: '1717 Penn Ave, Pittsburgh, PA 15222',
        phone: '(412) 555-0119',
        hours: 'Open 24 hours'
    }
]

module.exports = async ({ zip_code = '' } = {}) => {
    if (!zip_code || typeof zip_code !== 'string' || !zip_code.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a zip_code (ZIP code or city) to search PNC branches and ATMs near.' }],
            // structuredContent.branches — derived from action name "find_branch" (bare array outputSchema rule)
            structuredContent: { branches: [] }
        }
    }

    const query = zip_code.trim()

    // Mock lookup: return all branches as if they were near the requested location.
    // Real API would filter by proximity to query.
    const branches = MOCK_DATA.map((b) => ({
        name: b.name,
        address: b.address,
        phone: b.phone,
        hours: b.hours
    }))

    const summary = `Found ${branches.length} PNC branch and ATM location${branches.length === 1 ? '' : 's'} near ${query}.`

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.branches — derived from action name "find_branch" (bare array outputSchema rule)
        structuredContent: { branches }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/locations?zip=${zip_code}
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
 *     `${process.env.API_BASE_URL}/locations?zip=${encodeURIComponent(zip_code)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
