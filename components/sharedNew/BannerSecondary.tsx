import Image from "next/image";

export default function BannerSecondary(props: { title: string, img: string }) {
    return (
        <section className="banner-container">
            <Image src={props.img} alt="Secondary Background" className="banner-image object-cover"/>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 py-4">
                {props.title}
            </h2>
        </section>
    );
}