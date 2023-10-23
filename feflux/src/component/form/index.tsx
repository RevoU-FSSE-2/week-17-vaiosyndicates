import { useFormik } from 'formik';
import * as yup from 'yup'
import { Input, Button } from 'antd';
import Card from '../Card';

interface Book {
  name: string;
  price: string;
  description?: string;
}

const initialValues = {
  name: '',
  price: '',
  description: ''
}

const validationSchema = yup.object({
  name: yup.string().required('This field required'),
  price: yup.string().required('ini wajib juga geis'),
  description: yup.string()
})

const Form = () => {

  const handleSubmit = (values: Book) => {
    console.log(values)
  }

  const formMik = useFormik({
      initialValues: initialValues,
      onSubmit: handleSubmit,
      validationSchema: validationSchema
  })

  return (
    <Card title={'Form Buku'}>
        <form onSubmit={formMik.handleSubmit}>
            <div>
                <h1 className='titleForm'>Nama Buku: </h1>
                <Input name={'name'}
                    value={formMik.values.name} 
                    onChange={formMik.handleChange('name')}
                    status={formMik.errors.name && 'error'}
                />
                {formMik.errors.name && (
                    <h2>{formMik.errors.name}</h2>
                )}
            </div>
            <div>
                <h1>Harga Buku: </h1>
                <Input name={'price'} 
                    value={formMik.values.price}
                    onChange={formMik.handleChange('price')}
                    status={formMik.errors.price && 'error'}
                    />
                {formMik.errors.price && (
                    <h2>{formMik.errors.price}</h2>
                )}
            </div>
            <div>
                <h1>Deskripsi Buku: </h1>
                <Input.TextArea rows={5} name={'description'} 
                    value={formMik.values.description}
                    onChange={formMik.handleChange('description')}
                    status={formMik.errors.description && 'error'}
                />
                {formMik.errors.description && (
                    <h2>{formMik.errors.price}</h2>
                )}
            </div>
            <Button type={'primary'} htmlType={"submit"}>Submit</Button>
        </form>
    </Card>
  )
}

export default Form