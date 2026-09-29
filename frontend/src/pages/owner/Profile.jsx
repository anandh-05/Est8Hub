import OwnerIcon from "../../components/owner/OwnerIcon";
import OwnerPageHeader from "../../components/owner/OwnerPageHeader";
import useOwnerData from "../../hooks/useOwnerData";

function Detail({ label, value, icon }) {
    return (
        <div className="flex gap-3 rounded-xl bg-zinc-50 p-3.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-[#9d741d] shadow-sm"><OwnerIcon name={icon} size={18} /></span>
            <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-400">{label}</p><p className="mt-1 break-words text-sm font-semibold text-zinc-800">{value || "Not added yet"}</p></div>
        </div>
    );
}

function Profile() {
    const { profile, profileState, ownerName, reloadProfile } = useOwnerData({ loadProperties: false });
    const initials = ownerName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    return (
        <div>
            <OwnerPageHeader
                title="Profile"
                description="Your owner profile details are used to personalise your Est8Hub workspace."
            />

            {profileState.error ? (
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    <span className="flex items-center gap-2"><OwnerIcon name="info" size={18} />We couldn&apos;t refresh your profile. Showing saved account details.</span>
                    <button type="button" onClick={reloadProfile} className="font-semibold underline underline-offset-2">Try again</button>
                </div>
            ) : null}

            <div className="grid gap-6 xl:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.35fr)]">
                <section className="rounded-2xl bg-[#1d1d1b] p-6 text-white shadow-[0_16px_36px_rgba(29,29,27,0.16)]">
                    <span className="grid size-20 place-items-center rounded-2xl bg-[#d9ad45] text-2xl font-bold text-[#1d1d1b] shadow-[0_10px_24px_rgba(217,173,69,0.2)]">{initials}</span>
                    <h2 className="mt-5 text-xl font-bold tracking-[-0.035em]">{profileState.loading ? "Loading profile…" : ownerName}</h2>
                    <p className="mt-1 text-sm text-zinc-400">Property Owner</p>
                    <div className="mt-6 border-t border-white/10 pt-5">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${profile?.is_verified_owner ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-200"}`}>
                            <OwnerIcon name={profile?.is_verified_owner ? "checkCircle" : "clock"} size={15} />
                            {profile?.is_verified_owner ? "Verified owner" : "Owner verification pending"}
                        </span>
                    </div>
                </section>

                <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-5 flex items-start justify-between gap-4"><div><h2 className="text-lg font-bold tracking-[-0.03em] text-zinc-900">Account details</h2><p className="mt-1 text-sm text-zinc-500">Details from your authenticated Est8Hub profile.</p></div><span className="grid size-10 place-items-center rounded-xl bg-[#fff7df] text-[#98701c]"><OwnerIcon name="user" size={20} /></span></div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <Detail label="Full name" value={ownerName} icon="user" />
                        <Detail label="Username" value={profile?.username} icon="at" />
                        <Detail label="Email" value={profile?.email} icon="mail" />
                        <Detail label="Phone" value={profile?.phone} icon="phone" />
                        <div className="sm:col-span-2"><Detail label="Address" value={profile?.address} icon="pin" /></div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Profile;
