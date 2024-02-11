<script lang="ts">
    import pb from "$lib/pb";
    import { onMount } from "svelte";

    const authData = pb.authStore.model
    let timetableUrl = ''

    let PAGE_MODE = 0 // 1 IS TEACHER

    onMount(async () => {
        if(!authData) {
            window.location.href = '/login'
            return
        }

        if(authData.is_teacher) PAGE_MODE = 1

        if(PAGE_MODE == 0) {
            try {
                const schoolData = await pb.collection('school').getOne(authData.school)
                if(!schoolData) return

                const semester = schoolData.semester
                const timetable = await pb.collection('timetable').getFullList({
                    filter: `year = ${authData.year} && field = "${authData.field}" && class = ${authData.class} && semester = ${semester}`
                })
                console.log(timetable)
                timetableUrl = pb.files.getUrl(timetable[0], timetable[0].timetable_img)
            } catch (err) {
                console.log(err)
            }
        }
    })
</script>

<div class='flex flex-col items-center mt-10'>
    <span class='font-semibold text-2xl'>{PAGE_MODE == 0 ? 'ตารางเรียน' : 'ตารางสอน'}</span>    
</div>
<div class='flex justify-center items-center gap-x-14 mt-14'>
    <img src={timetableUrl} class='w-[55rem]' />
</div>
