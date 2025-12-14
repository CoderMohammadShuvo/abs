const PRICING_DATA = [
    {
        countries: 'China, USA, EU Countries, Singapore, Australia, and Canada',
        standardFee: '$4,999',
        scholarship: 'Up to $1,500',
        finalFee: '$3,499',
    },
    {
        countries: 'Malaysia, Indonesia, All Middle and Central Asian Countries, and South Africa',
        standardFee: '$4,999',
        scholarship: 'Up to $2,000',
        finalFee: '$3,000',
    },
    {
        countries: 'Bangladesh',
        standardFee: '$4,999',
        scholarship: 'Up to $4,000',
        finalFee: '$999',
    },
    {
        countries: 'Pakistan, Sri Lanka, and African Countries',
        standardFee: '$4,999',
        scholarship: 'Up to $3,500',
        finalFee: '$1499',
    },
]

export default function CoursePricing() {
    return (
        <div className="mt-24">
            <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                Pricing
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse border border-gray-200 rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-white">
                            <th className="p-6 text-center border border-gray-200 w-1/3">
                                <span className="text-[#393F50] font-bold text-lg">Country lists</span>
                            </th>
                            <th className="p-6 text-center border border-gray-200">
                                <span className="text-[#393F50] font-bold text-lg block">Standard Fee</span>
                                <span className="text-[#393F50] font-bold text-lg block">(USD)</span>
                            </th>
                            <th className="p-6 text-center border border-gray-200">
                                <span className="text-[#393F50] font-bold text-lg block">Scholarship</span>
                                <span className="text-[#393F50] font-bold text-lg block">Range (%)</span>
                            </th>
                            <th className="p-6 text-center border border-gray-200">
                                <span className="text-[#393F50] font-bold text-lg block">Final Fee Range</span>
                                <span className="text-[#393F50] font-bold text-lg block">(USD)</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {PRICING_DATA.map((row, index) => (
                            <tr key={index}>
                                <td className="p-6 border border-gray-200 text-gray-600 text-center">
                                    {row.countries}
                                </td>
                                <td className="p-6 border border-gray-200 text-gray-600 text-center font-medium">
                                    {row.standardFee}
                                </td>
                                <td className="p-6 border border-gray-200 text-gray-600 text-center font-medium">
                                    {row.scholarship}
                                </td>
                                <td className="p-6 border border-gray-200 text-gray-600 text-center font-medium">
                                    {row.finalFee}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
