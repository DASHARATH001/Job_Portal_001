import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../table'
import { Avatar, AvatarImage } from '../utils/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../utils/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import useGetAllCompany from '../Hooks/useGetAllCompany'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    useGetAllCompany();
    const navigate = useNavigate();

    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);

    useEffect(() => {
        // Logic fix: Only filter if companies exist
        const filtered = companies.length > 0 ? companies.filter((company) => {
            if (!searchCompanyByText) {
                return true; // Show everything if search is empty
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        }) : [];

        setFilterCompany(filtered);
    }, [companies, searchCompanyByText]);

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        // Logic fix: Map over filterCompany, not companies
                        filterCompany?.map((company) => (
                            <TableRow key={company._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo} />
                                    </Avatar>
                                </TableCell>

                                <TableCell>{company.name}</TableCell>

                                <TableCell>
                                    {company.createdAt?.split("T")[0]}
                                </TableCell>

                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>

                                        <PopoverContent className="w-32">
                                            <div 
                                                onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                                className='flex items-center gap-2 w-fit cursor-pointer'
                                            >
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable




