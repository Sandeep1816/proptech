'use client';

import { Subscription } from '@prisma/client';

type ExhibitorTableProps = {
  exhibitors: Subscription[];
}

export default function ExhibitorTable({ exhibitors }: ExhibitorTableProps) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Registration Date
            </th>
          </tr>
        </thead>
        <tbody>
          {exhibitors.map((exhibitor) => (
            <tr key={exhibitor.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{exhibitor.email}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {new Date(exhibitor.createdAt).toLocaleString()}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
