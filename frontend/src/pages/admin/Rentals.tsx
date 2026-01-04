import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { 
  Search,
  Loader2,
  Calendar,
  User,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Car as CarIcon,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

interface Rental {
  id: number;
  userId: number;
  carId: number;
  startDate: string;
  endDate: string;
  totalCost: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  userName?: string;
  carMake?: string;
  carModel?: string;
  createdAt: string;
}

export default function AdminRentals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const queryClient = useQueryClient();

  const { data: rentals = [], isLoading } = useQuery({
    queryKey: ['admin-rentals'],
    queryFn: () => api.get('/rentals/admin', true),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => 
      api.put(`/rentals/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-rentals'] });
      toast.success('Rental status updated successfully!');
    },
    onError: (error: any) => {
      setError(error.response?.data?.error || 'Failed to update rental status');
      toast.error(error.response?.data?.error || 'Failed to update rental status');
    }
  });

  const filteredRentals = rentals.filter((rental: Rental) =>
    rental.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rental.carMake?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rental.carModel?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: (info: any) => <div className="font-medium">#{info.getValue('id')}</div>,
    },
    {
      accessorKey: 'userName',
      header: 'Customer',
      cell: (info: any) => (
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-slate-400" />
          {info.getValue('userName')}
        </div>
      ),
    },
    {
      accessorKey: 'carInfo',
      header: 'Car',
      cell: (info: any) => (
        <div className="flex items-center">
          <CarIcon className="h-4 w-4 mr-2 text-slate-400" />
          {info.row.original.carMake} {info.row.original.carModel}
        </div>
      ),
    },
    {
      accessorKey: 'startDate',
      header: (info: any) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          onClick={() => info.column.toggleSorting(info.column.getIsSorted() === 'asc')}
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-slate-400" />
          {new Date(info.getValue('startDate')).toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
      cell: (info: any) => (
        <div>{new Date(info.getValue('endDate')).toLocaleDateString()}</div>
      ),
    },
    {
      accessorKey: 'totalCost',
      header: (info: any) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          onClick={() => info.column.toggleSorting(info.column.getIsSorted() === 'asc')}
        >
          Total Cost
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (info: any) => (
        <div className="flex items-center font-medium">
          <DollarSign className="h-4 w-4 mr-2 text-green-600" />
          ${info.getValue('totalCost').toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info: any) => {
        const status = info.getValue('status') as string;
        const statusConfig = {
          pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
          active: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, label: 'Active' },
          completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Completed' },
          cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Cancelled' },
        };
        
        const config = statusConfig[status as keyof typeof statusConfig];
        const Icon = config.icon;
        
        return (
          <Badge className={config.color}>
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (info: any) => {
        const rental = info.row.original;
        const status = rental.status;
        
        if (status === 'completed' || status === 'cancelled') {
          return (
            <Badge variant="outline" className="text-slate-500">
              Finalized
            </Badge>
          );
        }

        return (
          <div className="flex space-x-2">
            {status === 'pending' && (
              <Button
                size="sm"
                onClick={() => updateStatusMutation.mutate({ 
                  id: rental.id, 
                  status: 'active' 
                })}
                disabled={updateStatusMutation.isPending}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Activate
              </Button>
            )}
            {status === 'active' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateStatusMutation.mutate({ 
                  id: rental.id, 
                  status: 'completed' 
                })}
                disabled={updateStatusMutation.isPending}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Complete
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredRentals,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-amber-500" />
              Car Rentals Management
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search rentals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-4 whitespace-nowrap text-sm border-b">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500">
                      No rentals found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-2 py-4">
            <div className="text-sm text-slate-700">
              Showing {table.getFilteredSelectedRowModel().rows.length} of {filteredRentals.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}