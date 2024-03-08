import Menu from '../components/menu.jsx'
import ArticleDetail from '../components/ArticleDetail.jsx';
import { Header } from '../components/Header.jsx';

export default function DeatialPage() {
   
    return (
        <section className='w-screen h-screen' >
            <Header></Header>
            <Menu></Menu>
            <ArticleDetail></ArticleDetail>

        </section>
    );
}
