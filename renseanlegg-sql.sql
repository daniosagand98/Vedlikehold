-- Renseanlegg: pozwala aplikacji kasować zdjęcia starsze niż 30 dni (tylko folder renseanlegg/ w buckecie work-orders)
create policy "renseanlegg photos delete" on storage.objects
for delete to authenticated
using (bucket_id = 'work-orders' and name like 'renseanlegg/%');
