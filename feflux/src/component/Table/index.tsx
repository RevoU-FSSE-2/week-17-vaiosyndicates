import { Button, Space, Table as Tables, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';


interface CategoryType {
  id?: string ;
  is_active?: boolean;
  name?: string;
  created_at?: string;
  updated_at?: string;
}

interface LoadingType {
  loading?: boolean;
}

interface CategoryWrapper {
  list: CategoryType[];
  handleDel:(x: string) => void;
  handleUpdate:(c: string) => void;
  handleAdd:() => void;
}

interface TableType extends CategoryWrapper {
  loader: LoadingType
}




const Table = ({list, handleDel, handleUpdate, handleAdd, loader}: TableType) => {
  const columns: ColumnsType<CategoryType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Is Active',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (_,v) => <a>{`${v.is_active}`}</a>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Created At',
      key: 'created_at',
      dataIndex: 'created_at',
    },
    {
      title: 'Updated At',
      key: 'updated_at',
      dataIndex: 'updated_at',
    },
    {
      title: 'Action',
      key: 'action',
      render: (list) => (
        
        <Space size="middle">
          <Button type={'primary'} htmlType={"submit"} onClick={() => handleUpdate(list.id)}   className='bg-gray-600'>Edit</Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDel(list.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              type: 'default',
              loading: loader.loading
            }}
          >
            <Button className='bg-gray-600 text-slate-300' >Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  
  return (
    <>
      <Button type={'primary'} htmlType={"button"} className='btn-add-cat bg-gray-500' onClick={handleAdd}>Add Data</Button>
      <Tables columns={columns}  dataSource={list.length > 0 ? list : []} />
    </>
  )

}

export default Table;