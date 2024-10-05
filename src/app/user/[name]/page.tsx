export default function Profile({ params }: { params: { name: string } }) {
  return (
    <main>
      Profile of {params.name}
    </main>
  );
}