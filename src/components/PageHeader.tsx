import Breadcrumbs from './navigator/Breadcrumbs';

interface PageProps{
    title: string,
    subtitle: string,
    pathname: string,
    withBreadcrumbs: boolean
}

export default function PageHeader({ title, subtitle, pathname, withBreadcrumbs } : PageProps){
    return (
        <div className="left-bar flex-1">
            {withBreadcrumbs  && <Breadcrumbs path={pathname} />}
            <h1 className="text-3xl font-semibold font-['Montserrat']">{title}</h1>
            <p className="text-slate-600 mb-5">{subtitle}</p>
        </div>
    )
}