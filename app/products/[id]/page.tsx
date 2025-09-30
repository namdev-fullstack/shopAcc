import DetailPage from "@/components/detailPage";

export default function ProductPage({ params }: { params: { id: string|number } }) {
  return <div>
    <DetailPage id={params.id} />
  </div>;
}