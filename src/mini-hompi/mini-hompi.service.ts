import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMiniHompiInput, CreateMiniHompiOutput } from './dtos/createMiniHompi.dto';
import { GetAllMiniHompiOutput } from './dtos/getAllMiniHompis.dto';
import { GetMiniHompiInput, GetMiniHompiOutput } from './dtos/getMiniHompi.dto';
import { MiniHompi } from './entities/miniHompi.entity';

@Injectable()
export class MiniHompiService {

    constructor(
        @InjectRepository(MiniHompi) private readonly miniHompiRepository: Repository<MiniHompi>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,

    ) {}

    async create({ scale }: CreateMiniHompiInput, owner): Promise<CreateMiniHompiOutput> {
        try {

            const user:User = await this.userRepository.findOne({id: owner.userId})

            if(!user) {
                return {
                    ok: false,
                    status: 400,
                    error: "로그인 된 유저를 찾을 수 없습니다."
                }
            }

            

            const originalHompi = await this.miniHompiRepository.findOne({id: user.miniHompiId});

            

            // 기존에 저장된 미니홈피를 제거하여 초기화
            if(originalHompi) {
                
                await this.miniHompiRepository.remove(originalHompi);
                
            }
            
            const newMiniHompi = this.miniHompiRepository.create({
                scale
            })

            

            
            newMiniHompi.owner = user;
            
            await this.miniHompiRepository.save(newMiniHompi)

            user.miniHompi = newMiniHompi
           
            await this.userRepository.save(user);
   

            return {
                ok: true,
                status: 200
            }
            

        }
        catch(error) {
            return {
                ok: false,
                error,
                status: 400
            }
        }
        
    }

    async getAll():Promise<GetAllMiniHompiOutput> {
        try {
            const miniHompis = await this.miniHompiRepository.find();

            let ownerIds = [];
            
            miniHompis.forEach(hompi => {
                ownerIds.push(hompi.ownerId)
            })

            const owners = await this.userRepository.findByIds(ownerIds);

            let newHompiList = [];

            // 미니홈피와 소유자를 매칭시킨 데이터
            owners.forEach(user => {
                miniHompis.forEach(hompi => {
                    if(hompi.ownerId === user.id){
                        newHompiList.push({
                            miniHompi: hompi,
                            owner: user
                        })
                    }
                })
            })
         

          
            
            return {
                ok: true,
                status: 200,
                miniHompis,
                owners,
                hompisWithOwners: JSON.stringify(newHompiList) // gql의 타입 체킹의 쓸데없는 복잡성을 피하기 위해 문자열화 시켜버림 ㅋㅋ
            }
        }
        catch(error) {
            return {
                ok: false,
                status: 400,
                error
            }
        }
    }

    async getOne({id: miniHompiId}:GetMiniHompiInput):Promise<GetMiniHompiOutput> {
        try {
            const miniHompi = await this.miniHompiRepository.findOne({id: miniHompiId});
            
            if(!miniHompi) {
                return {
                    ok: false,
                    status: 403,
                    error: "미니홈피를 찾을 수 없습니다."
                }
            }

            return {
                ok: true,
                status: 200,
                miniHompi
            }
        }
        catch(error) {
            return {
                ok: false,
                status: 400,
                error
            }
        }
    }

}
