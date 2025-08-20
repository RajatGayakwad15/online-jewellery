// import React from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
// import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
// import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
// import { UsersPrimaryButtons } from '@/features/users/components/users-primary-buttons'
// import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import ProductPage from '@/features/datatable/ProductPage'

const products = () => {
  return (
    <>
      <Header>
        {/* <TopNav links={topNav} /> */}
        <div className='ml-auto flex items-center space-x-4'>
          {/* <Search /> */}
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
      <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                <div>
                  <h2 className='text-2xl font-bold tracking-tight'>Product List</h2>
                  <p className='text-muted-foreground'>
                    Manage your Product here.
                  </p>
                </div>
                {/* <UsersPrimaryButtons /> */}
                  <Button className='space-x-1' >
        <span>Add Product</span> 
      </Button>
              </div>
              <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                {/* <UsersTable data={userList} columns={columns} /> */}
                <ProductPage />
              </div>
      </Main>
    </>
  )
}

export default products
