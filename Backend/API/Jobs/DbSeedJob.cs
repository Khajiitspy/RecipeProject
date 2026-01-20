using Core.Interfaces;
using Quartz;

namespace API.Jobs
{
    public class DbSeedJob(IDbSeederService dbSeederService) : IJob
    {
        public async Task Execute(IJobExecutionContext context)
        {
            await dbSeederService.SeedData();
        }
    }
}
